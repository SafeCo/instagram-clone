import React, { lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

//HOOKS
import { ProtectedRoute } from "./ProtectedRoute";
import {AuthProvider} from "./hooks/useAuth"

//PAGES
import LoginPage from './loginPage/LoginPage'
import NavBar from './navBar/NavBar';
import Loading from './globalComponents/loading/Loading';

const HomePage = lazy(() => import('./homePage/HomePage'))
const EditProfilePage = lazy(() => import('./editProfilePage/EditProfilePage'))
const ProfilePage  = lazy(() => import('./profilePage/ProfilePage'))

//BrowserRouter is in index.js

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
                  <EditProfilePage />
                </Suspense>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Suspense fallback={<Loading/>}>
                  <ProfilePage />
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