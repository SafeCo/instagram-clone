import React from 'react'
import Avatar from "@mui/material/Avatar"
import './FriendSuggestion.css'

const FriendSuggestion = ({profileUsername, suggestion}) => {
  
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
        <div className='friendSuggestion__profileSwitch'>Logout</div>
      </div>
      <h3 className='friendSuggestion__suggestTitle'> Suggestions for you</h3>
      {
        
        filteredList.map((name) =>(
          <div className='friendSuggestion__suggest'>
            <Avatar className="friendSuggestion__avatar"
            alt= {name}
            src="/static/images/avatar/1.jpg"
            /> 
            <div className='friendSuggestion__profileName'>{name}</div>
            <div className='friendSuggestion__profileSwitch'>Follow</div>
          </div>
          
        ))
      }
      
    </>
  )
}

export default FriendSuggestion