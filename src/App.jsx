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
import KinnSeller from './Pages/KinnSeller';
import Search from './Pages/Search';
import DetailRestaurant from './Pages/DetailRestaurant';
import Profile from './Pages/Profile';
import Orders from './Pages/Orders';
import Favourites from './Pages/Favourites';
import Settings from './Pages/Settings';
import Help from './Pages/Help';
import Cart from './Pages/Cart';
import Payment from './Pages/PaymentStripe';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import SellerOnboarding from './Pages/SellerOnboarding';
import Subscription from './Pages/Subscription';
import ShopApplicationWelcome from './Pages/ShopApplicationWelcome';
import ApplicationPending from './Pages/ApplicationPending';
import AdminDashboard from './Pages/Admin/AdminDashboard';

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
        <Route path="kinn-seller" element={<KinnSeller />} />
        <Route path="search" element={<Search />} />
        <Route path="detail/restaurant" element={<DetailRestaurant />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="cart" element={<Cart />} />
        <Route path="payment" element={<Payment />} />
        <Route path="seller/onboarding" element={<SellerOnboarding />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="open-your-shop-welcome" element={<ShopApplicationWelcome />} />
        <Route path="application/pending" element={<ApplicationPending />} />
        <Route path="admin" element={<AdminDashboard />} />
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
