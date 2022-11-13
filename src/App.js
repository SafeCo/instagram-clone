import React, { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

//PAGES
import LoginPage from './loginPage/LoginPage'
// import HomePage from './homePage/HomePage'
// import SetProfilePage from './setProfilePage/SetProfilePage';

import { ProtectedRoute } from "./ProtectedRoute";
import {AuthProvider} from "./hooks/useAuth"
import NavBar from './navBar/NavBar';
import Loading from './Loading';
import Spinner from './Spinner';


const HomePage = lazy(() => import('./homePage/HomePage'))
const SetProfilePage = lazy(() => import('./setProfilePage/SetProfilePage'))



function App() {
  
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={ <NavBar/> }>
            <Route path="/" element={
            <ProtectedRoute>
              <Suspense fallback={<Loading/>}>
                <HomePage />
              </Suspense>
            </ProtectedRoute>
            } />
            <Route path="/addprofile" element={
              <ProtectedRoute>
                <Suspense fallback={<Loading/>}>
                  <SetProfilePage />
                </Suspense>
              </ProtectedRoute>
            } />
          </Route>
          
        </Routes>
      </AuthProvider>
    </>
    
 
    
    

  )
}



export default App