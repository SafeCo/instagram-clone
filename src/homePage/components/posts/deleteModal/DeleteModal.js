import React from 'react'
import './DeleteModal.css'
import firebase from 'firebase/compat/app';
import { db } from '../../../../firebase';


function DeleteModal({id, user, username, filename}) {
  
  const deletePost =()=>{

    const storage = firebase.storage();
    const picture = storage.ref().child(`images/${filename}`);
      picture
        .delete()
        .then(function () {
          console.log("delete success")
        })
        .catch(function (error) {
          console.error(error);
        });
    db.collection("posts").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
  }
  

  return (
    <div className="deleteModal__container"> 
      <div className="deleteModal__position">
        <div className="deleteModal__boxContainer">
              {username === user.displayName ?
                <button className="deleteModal__boxButton important" onClick={()=>{deletePost()}}>Delete</button>:
                null
              }
              <button className="deleteModal__boxButton bottom important" >Report</button>
              <button className="deleteModal__boxButton bottom important" >Unfollow</button>
              <button className="deleteModal__boxButton bottom" >Add to favourites</button>
              <button className="deleteModal__boxButton bottom" >Go to Post</button>
              <button className="deleteModal__boxButton bottom" >Share to...</button>
              <button className="deleteModal__boxButton bottom" >Copy Link</button>
              <button className="deleteModal__boxButton bottom" >Embed</button>
              <button className="deleteModal__boxButton bottom" name="cancelModal" >Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal