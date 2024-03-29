import React,{useState} from 'react'
import {storage, db } from "../../../firebase"; 
import firebase from 'firebase/compat/app';
import Avatar  from '@mui/material/Avatar';
import back from '../../../icons/back.svg'
import './ImageUpload.css'

function ImageUpload({setSelectedFile, selectedFile, preview, username, userProfilePic, userId}) {
	const [caption, setCaption] = useState('');

	let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
	let dateTime = date+'-'+time+'-';

	const handleUpload = () => {
		const fileName = `${dateTime + selectedFile.name}`
		storage.ref(`images/${fileName}`).put(selectedFile)
		.then(()=>{
			storage
				.ref("images")
				.child(fileName)
				.getDownloadURL()
				.then(url => {
						db.collection("posts").add({
								timestamp: firebase.firestore.FieldValue.serverTimestamp(),
								caption: caption,
								imageUrl: url,
								username: username,
								filename: fileName,
								userId: userId
						})
						setCaption("");
						setSelectedFile(null);
				});
		});		
	};



	return (
    <>
		<div className="imageUpload__container">
			<div className="imageUpload__header"> 
				<div className="imageUpload__header__backButtonContainer">
					<button onClick={()=>{setSelectedFile(null)}}><img src={back} alt="back button"/></button>
				</div>
				<div className="imageUpload__header__text">
					<p>Create new Post</p> 
				</div>
				<div className="imageUpload__header__postButtonContainer">
					<button onClick={handleUpload}>
						<p>Post</p>
					</button>
				</div>
			</div> 

			<div className="imageUpload__previewContainer">
				<div className="imageUpload__imageContainer">
					{selectedFile && <img className="imageUpload__image" src={preview} alt="upload" />}
				</div>
				<div className="imageUpload__captionContainer">
					<div className="imageUpload__captionProfile">
						<Avatar
						alt={username}
						sx={{ width: 23, height: 23, marginRight: 1 }}
						src={userProfilePic}
						/>
						<div>{username}</div>
					</div>
					<textarea className="imageUpload__caption" type="text" placeholder="Write a caption..." onChange={event => setCaption(event.target.value) } value={caption}></textarea>
				</div>
			</div>
		</div>
    </>
  )
}

export default ImageUpload