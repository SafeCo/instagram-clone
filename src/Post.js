import React, { useEffect, useState }from 'react'
import './Post.css';
import Avatar from "@mui/material/Avatar"
import { db } from './firebase';
import DeleteModal from './DeleteModal';
import ModalWrapper from './ModalWrapper';
import ViewComments from './ViewComments';
import PostIcons from './PostIcons';
import AddComment from './AddComment';

function Post({filename, postId, user, username, caption, imageUrl, photoUrl}) {
  const [comments, setComments] = useState([]);
  const [reducedComments, setReducedComments] = useState([])
  const [modalChild, setModalChild]= useState("")
	const [modalOpen, setModalOpen] = useState(false)


  const modalSwitchOpen= (e)=>{
		switch(e.target.name){
			case "deletePost":
				setModalChild(
					<DeleteModal  
            username={username}
            user={user}
            id={postId} 
            filename={filename} 
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
        {
          photoUrl ? (
            <Avatar
            className="post__avatar"
            alt={username}
            src={photoUrl}
            />
          ): (
            <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
            />
          )
        }
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