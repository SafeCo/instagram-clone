import React, {useEffect, useState, lazy, Suspense } from 'react'; 
import { useOutletContext } from 'react-router-dom'
import { db } from '../firebase';

import './HomePage.css';

import FriendSuggestion from './components/suggestions/FriendSuggestion';
import ReelCarousel from './components/reelCarousel/ReelCarousel';
import LazyPost from './components/lazyComponents/LazyPost';

const Post = lazy(() => import('./components/posts/post/Post'))


function HomePage() {
	const [posts, setPosts] = useState([]);
	const {user}= useOutletContext()
	const {userInfo} = useOutletContext()

	//Placing posts on page
	useEffect(()=>{
			const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
				setPosts(snapshot.docs.map(doc => (
					{
						id: doc.id,
						post: doc.data(),
					}
				)));
			})
			return ()=> unsubscribe();        
		}, []);

	return (
		<>
			<main className="app__main">
				<section className="app__section">
					<div className="app__sectionLeft">
								<ReelCarousel />
							<div className="app__posts">
									{
										
										posts.map(({id, post}) =>(
											<Suspense key={id} fallback={ <LazyPost/> } >
												<Post key={id} filename={post.filename} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} userId={post.userId}/>
											</Suspense>
										))
									}
							</div>
					</div>
					<div className="app__friendSugg">
						<FriendSuggestion profileUsername={userInfo.username} userPhotoUrl={userInfo.photoUrl}/>
					</div> 
				</section>
			</main>
    	</>
	)
}

export default HomePage