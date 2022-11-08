import React, {useState, useEffect} from 'react'
import './ViewComments.css'
import Avatar from "@mui/material/Avatar"
import PostIcons from '../postIcons/PostIcons'
import AddComment from '../addComments/AddComment'
import { db } from '../../../firebase';



function ViewComments({ user, caption, postId, username, imageUrl, postPhotoUrl}) {

	const [comments, setComments] = useState([]);


	useEffect(()=> {
		let unsubscribe;
		if(postId) {
			unsubscribe = db
			.collection("posts")
			.doc(postId)
			.collection("comments")
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
			setComments(snapshot.docs.map((doc) => doc.data()));
			});
		}
		return()=>{
			unsubscribe();
		};
		}, [postId]);

  return (
		<div className="vC__position">
			<div className="vC__box__container">
				<div className="vC__container">
					<div className="vC__box">

						<div className="vC__image__ult">
							<div className="vC__image__holder">
								<div className="vC__image__container">
									<img
									className="vC__image"
									src={imageUrl}
									alt="PostImage"
									/>
								</div>
							</div>
						</div>

						<div className="vC__info__container">
							<div className="vC__info">
								<div className="vC__info__box">
									<div className="vC__info__profile">
										<header className="vC__info__avatar">
											{
												postPhotoUrl ? (
													<Avatar
													className="post__avatar"
													alt={username}
													src={postPhotoUrl}
													/>
												): (
													<Avatar
													className="post__avatar"
													alt={username}
													src="/static/images/avatar/1.jpg"
													/>
												)
											}
											<div className="vc__avatar__name">{username}</div>
										</header>
										<div className="vC__info__buttonContainer">
											<button className="vC__info__button">
												<div>&bull; &bull; &bull;</div>
											</button>
										</div>
									</div>
									<div className="vC__commentsBox">
										<div className="vC__commentsContainer">
											<div className="vC__comments">
												<div className="vC__commentContainer">
													<div className="vC__commentArea">
														<div className="vC__comment">
																{
																	postPhotoUrl ? (
																		<Avatar
																		className="vC__commentAvatar"
																		alt={username}
																		src={postPhotoUrl}
																		/>
																	):(
																		<Avatar
																		className="vC__commentAvatar"
																		alt={username}
																		src="/static/images/avatar/1.jpg"
																		/>
																	)
																}
															<p> 
																<strong>{username}</strong> {caption}
															</p>
														</div>
													</div>
												</div>
											
											{
												comments.map((comment, index)=> (
													<div key={index+postId} className="vC__commentContainer">
														<div className="vC__commentArea">
															<div className="vC__comment">
																{
																	comment.photoUrl ? (
																		<Avatar
																		className="post__avatar"
																		alt={username}
																		src={comment.photoUrl}
																		/>
																	): (
																		<Avatar
																		className="post__avatar"
																		alt={username}
																		src="/static/images/avatar/1.jpg"
																		/>
																	)
																}

																<p>
																	<strong>{comment.username}</strong> {comment.text}
																</p>
															</div>
														</div>
													</div>
												
												)) 
											}
											</div>
										</div>
										<div >
											<PostIcons/>
										</div>
										<div className="vC__addComment">
											<AddComment  postId={postId} user={user}/>
										</div>
									</div>

								</div>
							

							</div>
							
						</div>

					</div>
					
					
				</div>
			</div>
		</div>
  )
}

export default ViewComments