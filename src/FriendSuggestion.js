import React,{useContext} from 'react'
import Avatar from "@mui/material/Avatar"
import './FriendSuggestion.css'
import AuthContext from './hooks/useAuth'


const FriendSuggestion = ({profileUsername, suggestion}) => {
  const { logout } = useContext(AuthContext)
  
  const filteredList = suggestion.filter((name)=>{
    if(name === profileUsername){
      return false
    }else{
      return true
    }
  })

  return (
    <>
      <div className='friendSuggestion__profile'>
        <Avatar
        className="post__avatar"
        alt= {profileUsername}
        src="/static/images/avatar/1.jpg"
        />
        <div className='friendSuggestion__profileName'>{profileUsername}</div>
        <div ><button className='friendSuggestion__profileLogout' onClick={()=>{logout()}} >Logout</button> </div>
      </div>
      <p className='friendSuggestion__suggestTitle'> Suggestions for you</p>
      {
        
        filteredList.map((name) =>(
          <div className='friendSuggestion__suggest'>
            <Avatar 
            className="friendSuggestion__avatar"
            alt= {name}
            src="/static/images/avatar/1.jpg"
            sx={{height: 30, width: 30}}
            /> 
            <div className='friendSuggestion__profileName'>{name}</div>
            <div className='friendSuggestion__profileLogout'>Follow</div>
          </div>
          
        ))
      }
      
    </>
  )
}

export default FriendSuggestion