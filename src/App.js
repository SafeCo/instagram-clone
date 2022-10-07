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



console.log("new routes branch")

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
const [suggestion, setSuggestion] = useState([]);
const shouldLogOne = useRef(true)
const shouldLogTwo = useRef(true)
//APPARENTLY THERE'S A BUG WITH USEEFFCT IN REACT 18 THAT USEEFFECT WITHOUT DEPENDECIES ARE EXECUTED TWICE
//NVM ITS A STRESS TEST FOR REACT 18




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

  if(shouldLogTwo.current){
    shouldLogTwo.current = false;
    console.log("use effect 2")
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
  })
  }
  
}, []);

useEffect(()=>{
  if(shouldLogOne.current){
    shouldLogOne.current = false;
    console.log("use effect 1")
    db.collection("posts").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data =  doc.data()
        setSuggestion((suggest)=>
          [
            ...suggest,
            data.username
          ]
        )
      });
    });
  }
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
          src={InstaLogo}
          alt="instagram logo"
        />
        <div className="app__header__searchBar">
              <img className="app__header__searchIcon" src={searchIcon} alt='Search Icon'/>
            Search
        </div>
        {user ? (
          <div className="app__headerIcons">
            <img className="app__headerIcon" src={require('./home.png')} alt='home button'/>
            <img className="app__headerIcon" src={require('./send.png')} alt='send button'/>
            <img className="app__headerIcon" src={require('./plus.png')} alt='plus button'/>
            <img className="app__headerIcon" src={require('./explore.png')} alt='explore button'/>
            <img className="app__headerIcon" src={require('./heart.png')} alt='heart button'/>
            <Button onClick={()=> auth.signOut()}>Logout</Button>
          </div>
  
        ):(
          <div className="app__loginContainer">
            <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={()=> setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>



     
      <div className="app__main">
      {user?.displayName ? (
        <div className="app__reels">
          <Reel username={user.displayName}/>
        </div>
      ): (
        <h3>Sorry you need to login to see reels</h3>
      )}
        

        <div className="app__posts">
            {
              posts.map(({id, post}) =>(
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
              ))
            }
        </div>

        {user?.displayName ? (
          <div className="app__friendSugg">
            <FriendSuggestion suggestion={suggestion} profileUsername={user.displayName}/>
          </div>
        ): (
          <h3>Sorry you need to login to see friend suggestions</h3>
        )}
 

      </div>
      

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry you need to login to upload</h3>
      )}
      

    </div>
  );
}

export default App;
