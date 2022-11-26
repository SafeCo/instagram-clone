import React, {useEffect, useState, useContext} from 'react'; 
import { db, auth, storage} from '../firebase';
import AuthContext from '../hooks/useAuth'
import './LoginPage.css'
import LoginImage from './components/loginImage/LoginImage';
import SignIn from './components/signIn/SignIn'
import SignUp from './components/signUp/SignUp';



function LoginPage() {
  const { login } = useContext(AuthContext)
  const { logout } = useContext(AuthContext)

  const [isSignedIn, setIsSignedIn] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 780px)").matches
)
  useEffect(() => {
    window
    .matchMedia("(min-width: 780px)")
    .addEventListener('change', e => setMatches( e.matches ));
    return ()=>{
      window
      .matchMedia("(min-width: 780px)")
      .removeEventListener('change', e => setMatches( e.matches ));
    }
  }, []);

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

  auth.currentUser.reload()

  db.collection('usernames').doc(authUser.user.uid).set({
    username: username,
    id: authUser.user.uid,
    photoUrl: username,
    bio: ""
  })
  })
  .then(() => {
    auth.currentUser.reload()
  })
  .catch((error)=> alert(error.message));
  }

  //Sign in component function
  const signInProps = (target, data)=>{
    if(target.name === "email"){
      setEmail(data)
    }else if(target.name === "password"){
      setPassword(data)
    }else if (target.name === "username"){
      setUsername(data)
    }else{
      alert("error")
    }
  }

//switch between sign in component and sign up component
const checkSignedIn = (event)=>{
  event.preventDefault()
  setIsSignedIn(!isSignedIn)
}


// Once user signed in, attach global oberver which is onAuthStateChanged method to auth, 
// when a user successfully signed in
// you can get info about user in the observer.
// basically the User state has all the info about the person who logged in.

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      //user logged in
      login(authUser);
      
    }else{
      //user logged out
      // called 4 times when logging out executes auth as log out once renders page twice
      logout();

    }
  })

    return () => {
      //perform some clean up actions before you use the useffect
      unsubscribe()
      }
   }, []);




  return (
    <main className='loginPage__main'>
      {
        matches? <LoginImage/> : null
      }
      
      {
        isSignedIn ?(
          
          <SignIn 
          checkSignedIn={checkSignedIn}
          signIn={signIn}
          signInProps={signInProps} 
          email={email} 
          password={password} />
          
        ) : (
          <SignUp
          checkSignedIn={checkSignedIn} 
          signUp={signUp}
          signInProps={signInProps} 
          username={username}
          email={email} 
          password={password} />
        )
        
      }
      
      
    </main>
  )
}

export default LoginPage