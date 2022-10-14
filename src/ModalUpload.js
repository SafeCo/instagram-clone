import React,{useState} from 'react'
import {storage, db } from "./firebase"; 
import firebase from 'firebase/compat/app';
import Avatar  from '@mui/material/Avatar';
import back from './icons/back.svg'
import './ModalUpload.css'

function ModalUpload({setSelectedFile, selectedFile, preview, username, onClose}) {
	const [caption, setCaption] = useState('');
	const [progress, setProgress] = useState(0);

	const handleUpload = () => {
		const uploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
		console.log(uploadTask)
		uploadTask.on(
			"state_changed",
			(snapshot) => {
					// progress function...
					const progress = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);                
			},
			(error) => {
					//Error function...
					console.log(error);
			},
			() => {
					//complete function...
					console.log("working")
					storage
							.ref("images")
							.child(selectedFile.name)
							.getDownloadURL()
							.then(url => {
									console.log(url)
									console.log("re-render")
									// post image inside db
									db.collection("posts").add({
											timestamp: firebase.firestore.FieldValue.serverTimestamp(),
											caption: caption,
											imageUrl: url,
											username: username                              
									});

									setCaption("");
									setProgress(0)
									setSelectedFile(null);
									onClose();
							});
				}
		);
	};



	return (
    <>
			<div className="postModal__container">
				<div className="postModal__header"> 
					<div className="postModal__header__backButtonContainer">
						<button onClick={()=>{setSelectedFile(null)}}><img src={back} alt="back button"/></button>
					</div>
					<div className="postModal__header__text">
						<p>Create new Post</p> 
					</div>
					<div className="postModal__header__postButtonContainer">
						<button onClick={handleUpload}>
							<p>Post</p>
						</button>
					</div>
				</div> 

				<div className="modalUpload__previewContainer">
					<div className="modalUpload__imageContainer">
						{selectedFile && <img className="modalUpload__image" src={preview} />}
					</div>
					<div className="modalUpload__captionContainer">
						<div className="modalUpload__captionProfile">
							<Avatar
							alt={username}
							sx={{ width: 23, height: 23 }}
							src="/static/images/avatar/1.jpg"
							/>
							<div>{username}</div>
						</div>
						<textarea className="modalUpload__caption" type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value) } value={caption}></textarea>
					</div>
				</div>
			</div>
    </>
  )
}

export default ModalUpload