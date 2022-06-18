import React, {useEffect, useState} from 'react'; 
import './App.css';
import Post from './Post';
import { db, auth, storage} from './firebase';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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
const [open, setOpen] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

useEffect(()=>{
  db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
  })
}, []);

  return (
    <div className="App">
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        
      >
        <Box sx={{ ...style, width: 400 }}>
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>
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
      <Button onClick={handleOpen}>Sign Up</Button>

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
