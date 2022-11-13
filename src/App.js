import React, { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './loginPage/LoginPage'
// import HomePage from './homePage/HomePage'
import { ProtectedRoute } from "./ProtectedRoute";
import {AuthProvider} from "./hooks/useAuth"
import SetProfilePage from './setProfilePage/SetProfilePage';
import NavBar from './homePage/components/navBar/NavBar';
import Loading from './Loading';


const HomePage = lazy(() => import('./homePage/HomePage'))


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