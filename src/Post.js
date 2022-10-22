import React, { useEffect, useState }from 'react'
import './Post.css';
import Avatar from "@mui/material/Avatar"
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import commentIcon from './icons/comment.svg'
import heart from './icons/heart.svg'
import send from './icons/send.svg'
import save from './icons/save.svg'
import DeleteModal from './DeleteModal';

function Post({switchModalFunc, filename, postId, user, username, caption, imageUrl, modalSetter}) {
  const [comments, setComments] = useState([]);
  const [reducedComments, setReducedComments] = useState([])
  const [comment, setComment] = useState('');
  const [deletePost, setDeletePost] = useState(false);

  const switchDeleteOpen = ()=>{
    setDeletePost(!deletePost)
    modalSetter(deletePost)
  }

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

  // this component re-renders 14 times most likely because of comments.
  useEffect(()=>{
    let filter = comments.slice(0, 2)
    setReducedComments(filter)
  },[comments])



  const postButtonColor = comment? {color: '#0095F6'} : {color: '#6082a3'}

  return (
    <>
    {deletePost && <DeleteModal id={postId} filename={filename} switchDeleteOpen={switchDeleteOpen} />}
    <div key={postId} className="post">
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
            <div className="post__headerButtonDots" onClick={()=>switchDeleteOpen()}>
              &bull; &bull; &bull;
            </div>
          </div>
        </div>
        
      </div>

      <img className="post__image"
      src={imageUrl} 
      alt="Not Working"
      />
      <section className="post__iconBar">
        <div className="post__iconBar__iconContainer">
          <button>
            <img
            className="post__iconBar__Icon"
						src={heart}
						alt="Heart Icon"/>
          </button>
          
        </div>

        <div className="post__iconBar__iconContainer">
          <button>
            <img
            className="post__iconBar__Icon"
						src={commentIcon}
						alt="Comment Icon"/>
          </button>
        </div>

        <div className="post__iconBar__iconContainer">
          <button>
            <img
            className="post__iconBar__Icon"
						src={send}
						alt="Send Icon"
					  />
          </button>
        </div>

        <div className="post__iconBar__iconContainer">
          <button>
            <img
            className="post__iconBar__Icon"
						src={save}
						alt="Save Icon"
					  />
          </button>
        </div>
      </section>
      
      
      
        <div className="post__comments">
          <p> 
            <strong>{username}</strong> {caption}
          </p>
          {
            reducedComments.map((comment, index)=> (
              <p key={index+postId}>
                <strong>{comment.username}</strong> {comment.text}
              </p>
              )) 
          }
          
        </div>
        {
            comments.length > 2 ? 
              <p onClick={()=>{switchModalFunc()}} className="post__viewAll">View all comments</p> : null
          }
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
    </div>
    </>
  )
}

export default Post