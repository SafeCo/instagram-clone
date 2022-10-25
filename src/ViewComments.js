import React from 'react'
import './ViewComments.css'
import Avatar from "@mui/material/Avatar"
import PostIcons from './PostIcons'

function ViewComments({ caption, postId, username, comments, imageUrl}) {
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
									alt="Post Image"
									/>
								</div>
							</div>
						</div>

						<div className="vC__info__container">
							<div className="vC__info">
								<div className="vC__info__box">
									<div className="vC__info__profile">
										<header className="vC__info__avatar">
											<Avatar
											className="vC__avatar"
											alt={username}
											src="/static/images/avatar/1.jpg"
											/>
											<div className="vc__avatar__name">Name</div>
										</header>
										<div className="vC__info__buttonContainer">
											<button className="vC__info__button">
												<div>&bull; &bull; &bull;</div>
											</button>
										</div>
									</div>
									<div className="vC__commentsBox">
										<div className="vC__commentsContainer test">
											<div className="vC__comments">
												<div className="vC__commentContainer">
													<div className="vC__commentArea">
														<div className="vC__comment">
															<Avatar
																className="vC__commentAvatar"
																alt={username}
																src="/static/images/avatar/1.jpg"
															/>
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
																<Avatar
																	className="vC__commentAvatar"
																	alt={comment.username}
																	src="/static/images/avatar/1.jpg"
																/>

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
										<div className="vC__addComment test">
											<div>add comment</div>
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