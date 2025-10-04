import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useGoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    // DISABLED: Using Supabase OAuth instead
    console.log('Google Identity Services disabled - using Supabase OAuth');
    return;
    
    // Check if Google Client ID is configured
    if (!process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID === 'your_google_client_id_here') {
      setError('Google OAuth not configured. Please add your Google Client ID to .env file.');
      return;
    }

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        setIsGoogleLoaded(true);
      }
    };

    script.onerror = () => {
      setError('Failed to load Google authentication');
    };

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = (response) => {
    setIsLoading(true);
    setError(null);

    try {
      const decoded = jwtDecode(response.credential);
      setUser(decoded);
    } catch (err) {
      setError('Failed to process Google authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    setError(null);

    if (window.google && isGoogleLoaded) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setError('Google Sign-In popup was blocked or cancelled');
          setIsLoading(false);
        }
      });
    } else {
      setError('Google Sign-In not available');
      setIsLoading(false);
    }
  };

  const renderGoogleButton = (element, options = {}) => {
    if (window.google && element && isGoogleLoaded) {
      window.google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'signin_with',
        ...options
      });
    }
  };

  return {
    user,
    isLoading,
    error,
    isGoogleLoaded,
    signInWithGoogle,
    renderGoogleButton
  };
};

export default useGoogleAuth;