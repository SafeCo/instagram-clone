import React, {useEffect, useRef, useState, useContext} from 'react'; 
import './HomePage.css';
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
import AuthContext from './hooks/useAuth'


function HomePage() {

	const { user } = useContext(AuthContext);
	const { logout } = useContext(AuthContext)
	const [posts, setPosts] = useState([]);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [suggestion, setSuggestion] = useState([]);

	const shouldLogOne = useRef(true)
	const shouldLogTwo = useRef(true)


//Putting posts on page
	useEffect(()=>{
		if(shouldLogTwo.current){
				shouldLogTwo.current = false;
				console.log("use effect 2")
				db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
				setPosts(snapshot.docs.map(doc => ({
				id: doc.id,
				post: doc.data()
				})));
		})}
		}, []);

	//Friend Suggestions
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


	// Each element like insta logo, search bar and icons have their container within the main contianer
	// flex grow and shrink is used on the individual containers rather than the element
	// the element is merely moved around with justify content flex start and end

	return (
		<>
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
        
          <div className="app__headerIcons">
            <img className="app__headerIcon" src={require('./home.png')} alt='home button'/>
            <img className="app__headerIcon" src={require('./send.png')} alt='send button'/>
            <img className="app__headerIcon" src={require('./plus.png')} alt='plus button'/>
            <img className="app__headerIcon" src={require('./explore.png')} alt='explore button'/>
            <img className="app__headerIcon" src={require('./heart.png')} alt='heart button'/>
          </div>
  
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
		

    </>
		
	)
	}

export default HomePage