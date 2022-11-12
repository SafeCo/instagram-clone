import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './loginPage/LoginPage'
import HomePage from './homePage/HomePage'
import { ProtectedRoute } from "./ProtectedRoute";
import {AuthProvider} from "./hooks/useAuth"
import SetProfilePage from './setProfilePage/SetProfilePage';
import TestNav from './TestNav'
import NavBar from './homePage/components/navBar/NavBar';
function App() {
  return (


    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={ <NavBar/> }>
          <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
          } />
          <Route path="/addprofile" element={
            <ProtectedRoute>
              <SetProfilePage />
            </ProtectedRoute>
          } />
        </Route>
        
      </Routes>
    </AuthProvider>
  
    // <AuthProvider>
    //   <Routes>
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/addprofile" element={<SetProfilePage/>} />
    //     <Route path="/home" element={
    //       <ProtectedRoute>
    //         <HomePage />
    //       </ProtectedRoute>
    //     } />
    //   </Routes>
    // </AuthProvider>
    
    

  )
}

export default App