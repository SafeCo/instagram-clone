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



  useEffect(()=>{
		if(shouldLogOne.current){
      shouldLogOne.current = false
			db.collection("usernames").get().then((querySnapshot) => {
				for(let i = 0; i < 11; i++){
					if(querySnapshot.docs[i]){
						let data = querySnapshot.docs[i].data().username
						let id = querySnapshot.docs[i].id
            let profilePic = querySnapshot.docs[i].data().photoUrl

						setSuggestion((suggest)=>
						[
							...suggest,
							{
								username: data,
								id: id,
                photoUrl: profilePic
							}
						]
						
					)
					}else{
						break;
					}
				}
			});
		}
	}, []);



  const reducedList = []
  for(let i = 0; i < 5; i++){
    if(suggestion[i]){
      reducedList.push(suggestion[i])
    }else{
      break;
    }
  }

  const filteredList = reducedList.filter((name)=>{
    if(name.username === profileUsername){
      return false
    }else{
      return true
    }
  })

  console.log(filteredList)

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
        filteredList.map(({username, id, photoUrl}) =>(
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