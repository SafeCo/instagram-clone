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
import ModalWrapper from './ModalWrapper';
import ViewComments from './ViewComments';
import PostIcons from './PostIcons';

function Post({filename, postId, user, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [reducedComments, setReducedComments] = useState([])
  const [comment, setComment] = useState('');
  const [deletePost, setDeletePost] = useState(false);
  const [modalChild, setModalChild]= useState("")
	const [modalOpen, setModalOpen] = useState(false)
  // const modalSwitch = props.modalSwitch
  // const filename = props.filename
  // const postId = props.postId
  // const user = props.user
  // const username= props.username
  // const imageUrl = props.imageUrl
  
  const modalSwitchOpen= (e)=>{
		switch(e.target.name){
			case "deletePost":
				setModalChild(
					<DeleteModal  
            id={postId} 
            filename={filename} 
            switchDeleteOpen={switchDeleteOpen} 
          />
					)
				break;
      case "viewComments":
        setModalChild(
          <ViewComments 
          caption={caption}
          postId={postId}
          username={username}
          comments={comments}
          imageUrl={imageUrl}  
          />
        )
        break;
			default :
				break;
		}
		setModalOpen(!modalOpen)
	}

  const switchDeleteOpen = ()=>{
    setDeletePost(!deletePost)
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


  useEffect(()=>{
    let filter = comments.slice(0, 2)
    setReducedComments(filter)
  },[comments])



  const postButtonColor = comment? {color: '#0095F6'} : {color: '#6082a3'}

  return (
    <>
    {modalOpen&& 
      <ModalWrapper modalState={modalOpen} modalSwitch={modalSwitchOpen}>
        {modalChild}
      </ModalWrapper>
    }
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
          <button name="deletePost" onClick={(e)=>modalSwitchOpen(e)} className="post__headerButton">
              &bull; &bull; &bull;
          </button>
        </div>
        
      </div>

      <img className="post__image"
      src={imageUrl} 
      alt="Not Working"
      />
      
      <PostIcons/>
      
      
      
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
              <button className="post__viewAll" name="viewComments" onClick={(e)=> modalSwitchOpen(e) }>
                View all comments 
              </button>
              
              : null
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