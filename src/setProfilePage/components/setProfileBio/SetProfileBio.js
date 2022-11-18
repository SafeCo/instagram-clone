import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import {storage, db } from "../../../firebase"; 
import firebase from 'firebase/compat/app';
import './SetProfileBio.css'


function SetProfileBio({switchSkip, newImage, setNewImage, imageFile}) {
    const [biography, setBiography] = useState()
    const [charCount, setCharCount] = useState()
    const navigate = useNavigate();

  
// firebase only takes a photo URL!!! that means no file
// you have to upload it to storage and then provide the photo link to firebase
// createobjecturl is a url lifetime tied to the window it was created, it represents sepcified file or blob
//
    const updateUserProfile = ()=>{
      const user = firebase.auth().currentUser;
      let userId = user.uid
      let fileName = userId + ".png"
      const uploadTask = storage.ref(`profilePictures/${fileName}`).put(imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {              
        },
        (error) => {
            console.log(error);
        },
        () => {
            //complete function...
            storage
                .ref("profilePictures")
                .child(fileName)
                .getDownloadURL()
                .then(url => {
                    // post image inside db
                    user.updateProfile({
                      photoURL: url
                    })
                    db.collection("usernames").doc(userId).update({
											photoUrl: url                          
									});
                });
          }
      );
      

      navigate("/")
    
    }
    

  return (
    <div className="sPB__boxContainer">
      <div className="sPB__box">
        { newImage ? (
          <Avatar
							sx={{ width: 200, height: 200 }}
							src={newImage}
					/>
          ):(
            <Avatar
							sx={{ width: 200, height: 200}}
							
					/>
          )
          
        }
        <div className="sPB__captionContainer">
          <textarea 
            maxLength="150"
            className="sPB__caption"
            type="text" 
            placeholder="Write a caption..." 
            onChange={event => {
                setBiography(event.target.value) 
                setCharCount(event.target.value.length)
              } } 
            value={biography}
          >
          </textarea>
          <div className="sPB__captionCountContainer">
            <span>{charCount ? charCount : "0" }</span>
            <span>/150</span>
          </div>
        </div>

        <div className="sPB__buttonContainer" >
          <button onClick={updateUserProfile} className="sPB__button">
            <p>Continue</p>
          </button>
        </div>
        <div className="sPB__buttonContainer__alt">
          <button className="sPB__button__alt" onClick={()=>{setNewImage(); switchSkip()}} >
            <p>Back</p>
          </button>
        </div>
      </div>
    </div>
    
  )
}

export default SetProfileBio