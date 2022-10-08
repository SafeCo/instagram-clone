import React, {useEffect, useState, useContext} from 'react'; 
import {useNavigate} from 'react-router-dom';
import { db, auth, storage} from './firebase';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import AuthContext from './hooks/useAuth'
import useAuth from './hooks/useAuth'


function LoginPage() {

  const { user } = useContext(AuthContext);
  console.log(user)
 

  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);


  // Sign in
  const signIn = (event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error)=> alert(error.message))
  }

  //Sign Up 
  const signUp = (event) =>{
  event.preventDefault();

  auth.createUserWithEmailAndPassword(email, password)
  .then((authUser)=>{
    authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error)=> alert(error.message));

}


// Once user signed in, attach global oberver which is onAuthStateChanged method to auth, 
// when a user successfully signed in
// you can get info about user in the observer.
// basically the User state has all the info about the person who logged in.

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      //user logged in
      setUser(authUser);
      
    }else{
      //user logged out
      setUser(null);
    }
  })
  return () => {
    //perform some clean up actions before you use the useffect
    unsubscribe()
  }
}, [user, username]);




  return (
    <div>
      <form className='login__signin'>
        <center>
          <img
            className="login__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
        </center>
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="text"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signIn}>Sign In</Button>
      </form>

      <form className='login__signup'>
              <center>
                <img
                  className="login__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="text"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
    </div>
  )
}

export default LoginPage