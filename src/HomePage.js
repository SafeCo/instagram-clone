import React, {useEffect, useRef, useState, useContext} from 'react'; 
import './HomePage.css';
import Post from './components/posts/post/Post';
import AuthContext from './hooks/useAuth'
import FriendSuggestion from './components/suggestions/FriendSuggestion';
import { db, auth } from './firebase';
import InstaLogo from './instagram-text-icon.svg'
import ReelCarousel from './components/reelCarousel/ReelCarousel';
import NavIcons from './components/navIcon/NavIcons';
import SearchBar from './components/searchBar/SearchBar';






function HomePage() {
	
	// NORMALLY BELOW CONTEXT BUT ADDED USEFFECT TO CALL DIRECTLY FROM FIREBASE
	//THERE IS AN ISSUE WHERE NEW ACCOUNT ARE NOT GETTING THE DISPLAYNAME 
	//MOST LIKELY DUE TO THE PAGE CHANGING BEFORE FIREBASE CAN BE UPDATED

	// const { user } = useContext(AuthContext);
	
	const [posts, setPosts] = useState([]);
	const [suggestion, setSuggestion] = useState([]);

	const shouldLogOne = useRef(true)
	const shouldLogTwo = useRef(true)

	
	
	
	//  None of the Firebase Authentication APIs cost money, except for phone authentication after the free monthly quota has been exhausted

	const [user, setUser]= useState([])
	useEffect(()=>{
		auth.onAuthStateChanged((userObj)=>{
			if(userObj){
				console.log("authstatechanged")
				setUser(userObj)
			}
		})
	},[])



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
				for(let i = 0; i < 11; i++){
					if(querySnapshot.docs[i]){
						let data = querySnapshot.docs[i].data().username
						let id = querySnapshot.docs[i].id
						setSuggestion((suggest)=>
						[
							...suggest,
							{
								username: data,
								id: id
							}
						]
						
					)
					}else{
						break;
					}
				}
			});
		}
	}, [posts]);
	
	// Each element like insta logo, search bar and icons have their container within the main contianer
	// flex grow and shrink is used on the individual containers rather than the element
	// the element is merely moved around with justify content flex start and end

	return (
		<>
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
						<SearchBar/>
					</div>  
						
					<div className="app__headerIconsFlex">
						<NavIcons profilePic={user.photoURL} username={user.displayName}/>
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
										<Post key={id} filename={post.filename} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postPhotoUrl={post.photoUrl}/>
									))
								}
						</div>
				</div>
					


					<div className="app__friendSugg">
						<FriendSuggestion suggestion={suggestion} profileUsername={user.displayName} photoUrl={user.photoURL}/>
					</div> 
				</section>
				
		
			</main>
			
    	</>
	)

}

export default HomePage