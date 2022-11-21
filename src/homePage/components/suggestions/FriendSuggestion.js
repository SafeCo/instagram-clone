import React,{useContext, useState, useRef, useEffect} from "react"
import { db } from '../../../firebase';

import Avatar from "@mui/material/Avatar"
import "./FriendSuggestion.css"
import AuthContext from "../../../hooks/useAuth"

//Filtered suggestions need to be from usernames collection which will contain photoUrl

const FriendSuggestion = ({profileUsername, userPhotoUrl}) => {
  const { logout } = useContext(AuthContext)
  const shouldLogOne = useRef(true)
  const [suggestion, setSuggestion] = useState([]);


  // Make get request, use filter and random, ensure that user is first??
  useEffect(()=>{
      const user = String(profileUsername)
			db.collection("usernames")
      .where("username", "!=", user)
      .limit(5)
      .get()
      .then((querySnapshot) => {
        setSuggestion(querySnapshot.docs.map((docs)=>{
          return docs.data()
        }))



				// for(let i = 0; i < 11; i++){
				// 	if(querySnapshot.docs[i]){
				// 		let data = querySnapshot.docs[i].data().username
				// 		let id = querySnapshot.docs[i].id
        //     let profilePic = querySnapshot.docs[i].data().photoUrl

				// 		setSuggestion((suggest)=>
				// 		[
				// 			...suggest,
				// 			{
				// 				username: data,
				// 				id: id,
        //         photoUrl: profilePic
				// 			}
				// 		]
						
				// 	)
				// 	}else{
				// 		break;
				// 	}
				// }
			});
		
	}, []);

  useEffect(()=>{
    console.log(suggestion[0])

  },[suggestion])


 

  return (
    <>
      <div className="friendSuggestion__profile">
        {
          userPhotoUrl ? (
            <Avatar
            className="post__avatar"
            alt={profileUsername}
            src={userPhotoUrl}
            />
          ): (
            <Avatar
            className="post__avatar"
            alt={profileUsername}
            src="/static/images/avatar/1.jpg"
            />
          )
        }
        <div className="friendSuggestion__profileName">{profileUsername}</div>
        <div ><button className="friendSuggestion__profileLogout" onClick={()=>{logout()}} >Logout</button> </div>
      </div>
      <p className="friendSuggestion__suggestTitle"> Suggestions for you</p>
      {
        suggestion.map(({username, id, photoUrl}) =>(
          <div key={id} className="friendSuggestion__suggest">
            <Avatar 
            className="friendSuggestion__avatar"
            alt= {username}
            src={photoUrl}
            sx={{height: 30, width: 30}}
            /> 
            <div className="friendSuggestion__profileName">{username}</div>
            <div className="friendSuggestion__profileLogout">Follow</div>
          </div>
          
        ))
      }
      
    </>
  )
}


export default FriendSuggestion