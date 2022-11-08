import React,{useContext, useStat} from "react"
import Avatar from "@mui/material/Avatar"
import "./FriendSuggestion.css"
import AuthContext from "./hooks/useAuth"


const FriendSuggestion = ({profileUsername, suggestion, photoUrl}) => {
  const { logout } = useContext(AuthContext)

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

  return (
    <>
      <div className="friendSuggestion__profile">
        {
          photoUrl ? (
            <Avatar
            className="post__avatar"
            alt={profileUsername}
            src={photoUrl}
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
        filteredList.map(({username, id}) =>(
          <div key={id} className="friendSuggestion__suggest">
            <Avatar 
            className="friendSuggestion__avatar"
            alt= {username}
            src="/static/images/avatar/1.jpg"
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