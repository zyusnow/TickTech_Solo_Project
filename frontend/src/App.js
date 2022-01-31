import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import * as sessionActions from "./store/session";



import Navigation from "./components/Navigation";
import LoginPage from './components/LoginPage';
import SignupPage from "./components/SignupPage";
import PageNotFound from "./components/PageNotFound";
import EventsBrowse from "./components/Events/EventsBrowse";
import EventBrowse from "./components/Events/EventBrowse";
import AddEvent from "./components/Events/AddEvent";
import Hosting from "./components/Dashboard/Hosting";
import Attending from "./components/Dashboard/Attending";
import Saved from "./components/Dashboard/Saved";
import './app.css'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div>
        {isLoaded && (
          <div id='main'>
            <Routes>
              <Route path='/' element={<Navigate to='/events'/>} />
              <Route path='/events' element={<EventsBrowse />} />
              <Route path='/events/add' element={<AddEvent />} />
              <Route path='/events/:id' element={<EventBrowse />} />
              <Route path='/users/:id' element={<Navigate to='/users/:id/hosting'/>} />
              <Route path='/users/:id/hosting/*' element={<Hosting />} />
              <Route path='/users/:id/saved' element={<Saved />} />
              <Route path='/users/:id/attending' element={<Attending />} />
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
