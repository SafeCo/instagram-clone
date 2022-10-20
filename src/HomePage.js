import React, {useEffect, useRef, useState, useContext} from 'react'; 
import './HomePage.css';
import './ImageUpload.css'
import Post from './Post';
import Reel from './Reel';
import AuthContext from './hooks/useAuth'
import FriendSuggestion from './FriendSuggestion';
import { db } from './firebase';
import Avatar from "@mui/material/Avatar"
import ImageUpload from './ImageUpload';
import searchIcon from './search.svg';
import InstaLogo from './instagram-text-icon.svg'
import home_inUse from './icons/home_inUse.svg'
import send from './icons/send.svg'
import post from './icons/post.svg'
import explore from './icons/explore.svg'
import heart from './icons/heart.svg'
import CustomModal from './CustomModal'
import ReelCarousel from './ReelCarousel';




function HomePage() {
	
	
	const { user } = useContext(AuthContext);
	
	const [posts, setPosts] = useState([]);
	const [suggestion, setSuggestion] = useState([]);


	const shouldLogOne = useRef(true)
	const shouldLogTwo = useRef(true)


	const [open, setOpen] = useState(false);


	const [customIsOpen, setCustomIsOpen] = useState(false);


//Putting posts on page
	useEffect(()=>{
		if(shouldLogTwo.current){
				shouldLogTwo.current = false;
				console.log("use effect 2")
				db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
				setPosts(snapshot.docs.map(doc => ({
				id: doc.id,
				post: doc.data(),
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
					let data =  doc.data().username
					let id = doc.id
					setSuggestion((suggest)=>
						[
							...suggest,
							{
								username: data,
								id: id
							}
						]
						
					)
				});
			});
		}
	}, [posts]);

	const switchOpen = ()=>{
		setCustomIsOpen(!customIsOpen)
		modalSetter(customIsOpen)
	}

	const modalSetter = (modalState)=>{
		if(window.matchMedia("(max-width: 480px)").matches && modalState === false ){
			document.body.style.paddingRight = "0px"
			document.body.classList.add("noMobileScroll")

		}else if(window.matchMedia("(max-width: 480px)").matches && modalState === true){
			document.body.style.paddingRight = "0px"
			document.body.classList.remove("noMobileScroll")

		}else if (modalState === false){	
			const scrollBarWidth = window.innerWidth - document.body.clientWidth;
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = scrollBarWidth + "px"

		}else{
			document.body.style.overflowY = 'scroll'
			document.body.style.paddingRight = "0px"

		}
	}


	// Each element like insta logo, search bar and icons have their container within the main contianer
	// flex grow and shrink is used on the individual containers rather than the element
	// the element is merely moved around with justify content flex start and end

	return (
		<>
	
	  	{customIsOpen && <CustomModal username={user.displayName} setCustomIsOpen={switchOpen} />}


		<nav className='app__headerContainer'>
			<div className="app__header">
				<div className="app__headerImageFlex">
					<img
						className="app__headerImage"
						src={InstaLogo}
						alt="instagram logo"
					/>
				</div>

				<div className="app__header__searchBarFlex">
					<div className="app__header__searchBar">
						<input type="text" className="app__headerInput" />
							<div className="app__headerSearchItems">
								<img className="app__header__searchIcon" src={searchIcon} alt='Search Icon'/>
								<span>Search</span>
							</div>
					</div>
				</div>  
					
				<div className="app__headerIconsFlex">
					<div className="app__headerIcons">
						<div className="app__headerIconContainer">
							<button className="app__headerIconButton" >
								<img className="app__headerIcon" src={home_inUse} alt='home use button'/>
							</button>
						</div>
						
						<div className="app__headerIconContainer">
							<button className="app__headerIconButton" >
							<img className="app__headerIcon" src={send} alt='send button'/>
							</button>
						</div>

						<div className="app__headerIconContainer">
							<button onClick={() => switchOpen()} className="app__headerIconButton" >
								<img className="app__headerIcon" src={post} alt='post button'/>
							</button>
						</div>

						<div className="app__headerIconContainer">
							<button className="app__headerIconButton" >
								<img className="app__headerIcon" src={explore} alt='explore button'/>
							</button>
						</div>

						<div className="app__headerIconContainer">
							<button className="app__headerIconButton" >
								<img className="app__headerIcon" src={heart} alt='heart button'/>
							</button>
						</div>
						<div className="app__headerIconContainer">
							<Avatar
							className="app__headerIcon"
							alt={user.displayName}
							sx={{ width: 23, height: 23 }}
							src="/static/images/avatar/1.jpg"
							/>
						</div>
						
					</div>
				</div>
			</div>	
		</nav>
		

		<main className="app__main">
			<section className="app__section">
			<div className="app__sectionLeft">
						<ReelCarousel list={suggestion}/>
					<div className="app__posts">
							{
								posts.map(({id, post}) =>(
									<Post key={id} filename={post.filename} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} modalSetter={modalSetter} />
								))
							}
					</div>
			</div>
				


				<div className="app__friendSugg">
					<FriendSuggestion suggestion={suggestion} profileUsername={user.displayName}/>
				</div> 
			</section>
			
	
		</main>
    </>
		
	)
	}

export default HomePage