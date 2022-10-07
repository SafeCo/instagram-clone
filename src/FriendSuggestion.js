import React from 'react'
import Avatar from "@mui/material/Avatar"

const FriendSuggestion = ({profileUsername, suggestion}) => {
  return (
    <>
      <div className='friendSuggestion__profile'>
        <Avatar
        className="post__avatar"
        alt= {profileUsername}
        src="/static/images/avatar/1.jpg"
        />
        <div>{profileUsername}</div>
      </div>
      <h3> Suggestions for you</h3>
      {
        suggestion.map((name) =>(
          <div className='friendSuggestion__suggest'>
            <Avatar className="post__avatar"
            alt= {name}
            src="/static/images/avatar/1.jpg"
            /> 
            <div>{name}</div>
          </div>
          
        ))
      }
      
    </>
  )
}

export default FriendSuggestion