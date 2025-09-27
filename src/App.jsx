import React from 'react'
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from 'react';

import DefaultLayout from './Layouts/DefaultLayout';
import AuthLayout from './Layouts/AuthLayout';
import Homepage from './Pages/Homepage';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import FoundingSellers from './Pages/FoundingSellers';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import ForgotPassword from './Pages/Auth/ForgotPassword';

const App = () => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route index element={<Homepage />} />
        <Route path="founding-sellers" element={<FoundingSellers />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}

export default App
