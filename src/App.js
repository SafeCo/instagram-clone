import React, {useEffect, useState} from 'react'; 
import './App.css';
import Post from './Post';
import { db, auth, storage} from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

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

function App() {
const [posts, setPosts] = useState([]);

const [openSignIn, setOpenSignIn] = useState(false);
const [open, setOpen] = useState(false);
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState(null);

const handleOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      //user logged in
      console.log(authUser);
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

useEffect(()=>{
  db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
  })
}, []);

const signUp = (event) =>{
  event.preventDefault();

  auth.createUserWithEmailAndPassword(email, password)
  .then((authUser)=>{
    authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error)=> alert(error.message));
  setOpen(false);
}

const signIn = (event)=>{
  event.preventDefault();
  auth.signInWithEmailAndPassword(email, password)
  .catch((error)=> alert(error.message))

  setOpenSignIn(false);
}


  return (
    <div className="App">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          
        >
          <Box sx={{ ...style, width: 400 }}>
            <form className='app__signup'>
              <center>
                <img
                  className="app__headerImage"
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
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
            open={openSignIn}
            onClose={()=> setOpenSignIn(false)}
          >
            <Box sx={{ ...style, width: 400 }}>
              <form className='app__signup'>
                <center>
                  <img
                    className="app__headerImage"
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
              
              
            </Box>
          </Modal>
        </div>




      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {user ? (
        <Button onClick={()=> auth.signOut()}>Logout</Button>
      ):(
        <div className="app__loginContainer">
          <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=> setOpen(true)}>Sign Up</Button>
        </div>
      )}

      <h1>Test</h1>
      
      {
        posts.map(({id, post}) =>(
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
      

    </div>
  );
}

export default App;
