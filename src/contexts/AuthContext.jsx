import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Check for pending redirect after OAuth
      if (session?.user) {
        const redirectPath = sessionStorage.getItem('auth_redirect');
        if (redirectPath) {
          sessionStorage.removeItem('auth_redirect');
          window.location.href = redirectPath;
        }
      }
    }).catch((err) => {
      console.error('Supabase connection error:', err);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state change:', _event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Check for pending redirect after OAuth or email confirmation
      if ((_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') && session?.user) {
        const redirectPath = sessionStorage.getItem('auth_redirect');
        if (redirectPath) {
          sessionStorage.removeItem('auth_redirect');
          window.location.href = redirectPath;
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async (redirectPath = null) => {
    // Store the redirect path in sessionStorage before OAuth
    if (redirectPath) {
      sessionStorage.setItem('auth_redirect', redirectPath);
    }

    // Use current origin (handles localhost with any port, and production domain)
    const redirectUrl = window.location.origin;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });
    return { data, error };
  };

  const signInWithPassword = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signUpWithPassword = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    return { data, error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
    }
    return { error };
  };

  const updateUser = async (userData) => {
    const { data, error } = await supabase.auth.updateUser({
      data: userData
    });
    if (!error) {
      setUser(data.user);
    }
    return { data, error };
  };

  const value = {
    user,
    session,
    login: signInWithPassword, // Now points to email/password login
    signInWithGoogle,
    signInWithPassword,
    signUpWithPassword,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};