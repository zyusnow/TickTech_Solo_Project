import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import LoginPage from './components/LoginPage';
import SignupPage from "./components/SignupPage";
import LandingPage from "./components/LandingPage";
import PageNotFound from "./components/PageNotFound";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id='container'>
        {isLoaded && (
          <div id='main'>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/not-found' element={<PageNotFound />} />
              <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  )
}


export default App;
