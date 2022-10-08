import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import { ProtectedRoute } from "./ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

    </Routes>
  )
}

export default App