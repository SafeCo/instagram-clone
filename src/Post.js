import React, { useEffect, useState }from 'react'
import './Post.css';
import Avatar from "@mui/material/Avatar"
import { db } from './firebase';
import DeleteModal from './DeleteModal';
import ModalWrapper from './ModalWrapper';
import ViewComments from './ViewComments';
import PostIcons from './PostIcons';
import AddComment from './AddComment';

function Post({filename, postId, user, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [reducedComments, setReducedComments] = useState([])
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
          user={user}
          caption={caption}
          postId={postId}
          username={username}
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

  useEffect(()=>{
    let filter = comments.slice(0, 2)
    setReducedComments(filter)
  },[comments])

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
          <AddComment postId={postId} user={user}/>             
    </div>
    </>
  )
}

export default Post