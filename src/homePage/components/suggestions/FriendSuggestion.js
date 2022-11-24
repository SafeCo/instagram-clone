import React,{useContext, useState, useEffect} from "react"
import { useOutletContext } from 'react-router-dom'

import Avatar from "@mui/material/Avatar"
import "./FriendSuggestion.css"
import AuthContext from "../../../hooks/useAuth"

//Filtered suggestions need to be from usernames collection which will contain photoUrl

const FriendSuggestion = ({profileUsername, userPhotoUrl}) => {

  const { logout } = useContext(AuthContext)
  const {reelAndSug} = useOutletContext()
  const [filteredList, setFilteredList] = useState([])

  useEffect(()=>{
    setFilteredList(
        reelAndSug.filter((obj, index)=>{
          if(index < 4){
            return obj
          }else{
            return
          }
      })
    )
  },[reelAndSug])

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
            <div className="friendSuggestion__profileLogout noFeature">
              Follow
            </div>
          </div>
          
        ))
      }
      
    </>
  )
}


export default FriendSuggestion