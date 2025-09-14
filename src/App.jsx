import React from 'react'
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from 'react';

import DefaultLayout from './Layouts/DefaultLayout';
import Homepage from './Pages/Homepage';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';

const App = () => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route index element={<Homepage />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  )
}

export default App
