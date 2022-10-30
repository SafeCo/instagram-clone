import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import { ProtectedRoute } from "./ProtectedRoute";
import {AuthProvider} from "./hooks/useAuth"
import SetProfilePage from './SetProfilePage';

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addprofile" element={<SetProfilePage/>} />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
        </Routes>
    </AuthProvider>
    
    

  )
}

export default App