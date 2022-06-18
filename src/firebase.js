
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { initializeApp } from "firebase/app"

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA5J9WxBCALNpGrOzi1XM0bvXZi9TZF8xk",
    authDomain: "instagram-clone-react-102a0.firebaseapp.com",
    projectId: "instagram-clone-react-102a0",
    storageBucket: "instagram-clone-react-102a0.appspot.com",
    messagingSenderId: "417028960283",
    appId: "1:417028960283:web:cfb04883c9f6b27ec648be",
    measurementId: "G-WBTHGQ0GF3"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage}




