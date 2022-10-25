<<<<<<< HEAD
import React, {useEffect, useRef, useState} from 'react'; 
import './App.css';
import './ImageUpload.css'
import Post from './Post';
import Reel from './Reel';
import FriendSuggestion from './FriendSuggestion';
import { db, auth, storage} from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';
import searchIcon from './search.svg';
import InstaLogo from './instagram-text-icon.svg'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
=======
import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import { ProtectedRoute } from "./ProtectedRoute";
import {AuthProvider} from "./hooks/useAuth"
>>>>>>> Routes

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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