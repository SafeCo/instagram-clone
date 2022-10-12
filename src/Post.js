import React, { useEffect, useState }from 'react'
import './Post.css';
import Avatar from "@mui/material/Avatar"
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import commentIcon from './icons/comment.svg'
import heart from './icons/heart.svg'
import send from './icons/send.svg'
import save from './icons/save.svg'
import { red } from '@mui/material/colors';

function Post({postId, user, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
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

  const postComment = (event) => {
    event.preventDefault();
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setComment('');
  }

  const postButtonColor = comment? {color: '#0095F6'} : {color: '#6082a3'}

  return (
    <div className="post">
      <div className="post__header" >
        <div className="post__headerProfile">
          <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
          />
          <h3 className="post__username">{username}</h3>
        </div>
        <div className="post__headerButtonContainer">
          <div className="post__headerButton">
            <div className="post__headerButtonDots">&bull; &bull; &bull;</div>
          </div>
        </div>
        
      </div>

      <img className="post__image"
      src={imageUrl} 
      alt="Not Working"
      />
      <section className="post__iconBar">
        <div className="post__iconBar__heart">
          <img
            className="post__iconBar__Icon"
						src={heart}
						alt="Heart Icon"
					/>
        </div>
        <div className="post__iconBar__chat">
          <img
            className="post__iconBar__Icon"
						src={commentIcon}
						alt="Comment Icon"
					/>
        </div>
        <div className="post__iconBar__send">
          <img
            className="post__iconBar__Icon"
						src={send}
						alt="Send Icon"
					/>
        </div>
        <div className="post__iconBar__save">
          <img
            className="post__iconBar__Icon"
						src={save}
						alt="Save Icon"
					/>
        </div>
      </section>
      
      
      
        <div className="post__comments">
          <p> 
            <strong>{username}</strong> {caption}
          </p>
          {comments.map((comment)=> (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
            ))}
        </div>
      
      {user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e)=> setComment(e.target.value)}
            />
            <button
              disabled={!comment}
              className="post__button"
              type="submit"
              onClick={postComment}
            ><div style={postButtonColor}>Post</div></button>
          </form>        
      )}
      
      
    </div>
  )
}

export default Post