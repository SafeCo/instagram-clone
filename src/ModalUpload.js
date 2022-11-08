import React,{useState} from 'react'
import {storage, db } from "./firebase"; 
import firebase from 'firebase/compat/app';
import Avatar  from '@mui/material/Avatar';
import back from './icons/back.svg'
import './ModalUpload.css'

function ModalUpload({setSelectedFile, selectedFile, preview, username, photoUrl}) {
	const [caption, setCaption] = useState('');
	const [progress, setProgress] = useState(0);

	let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
	let dateTime = date+'-'+time+'-';

	const handleUpload = () => {
		const fileName = `${dateTime + selectedFile.name}`
		const uploadTask = storage.ref(`images/${fileName}`).put(selectedFile);
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
					storage
							.ref("images")
							.child(fileName)
							.getDownloadURL()
							.then(url => {
									// post image inside db
									db.collection("posts").add({
											timestamp: firebase.firestore.FieldValue.serverTimestamp(),
											caption: caption,
											imageUrl: url,
											username: username,
											filename: fileName,
											photoUrl: photoUrl                              
									});

									setCaption("");
									setProgress(0)
									setSelectedFile(null);
							});
				}
		);
	};



	return (
    <>
			<div className="modalUpload__container">
				<div className="modalUpload__header"> 
					<div className="modalUpload__header__backButtonContainer">
						<button onClick={()=>{setSelectedFile(null)}}><img src={back} alt="back button"/></button>
					</div>
					<div className="modalUpload__header__text">
						<p>Create new Post</p> 
					</div>
					<div className="modalUpload__header__postButtonContainer">
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
							sx={{ width: 23, height: 23, marginRight: 1 }}
							src="/static/images/avatar/1.jpg"
							/>
							<div>{username}</div>
						</div>
						<textarea className="modalUpload__caption" type="text" placeholder="Write a caption..." onChange={event => setCaption(event.target.value) } value={caption}></textarea>
					</div>
				</div>
			</div>
    </>
  )
}

export default ModalUpload