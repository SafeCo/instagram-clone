import React,{useState} from 'react'
import './AddComment.css'
import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';



function AddComment({postId, user}) {

    const [comment, setComment] = useState('');

    const postButtonColor = comment? {color: '#0095F6'} : {color: '#6082a3'}
    const postComment = (event) => {
        event.preventDefault();
            db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            photoUrl: user.photoURL
            });
            setComment('');
        }
        
    return (
        <form className="addComment__commentBox">
            <input
            className="addComment__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
            />
            <button
            disabled={!comment}
            className="addComment__button"
            type="submit"
            onClick={postComment}
            ><div style={postButtonColor}>Post</div></button>
        </form>       


    )
}

export default AddComment