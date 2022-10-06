import React from 'react'
import Avatar from "@mui/material/Avatar"

const FriendSuggestion = ({profileUsername, suggestion}) => {

  

  return (
    <>
      <div className='FriendSuggestion__profile'>
        <Avatar
        className="post__avatar"
        alt= {profileUsername}
        src="/static/images/avatar/1.jpg"
        />
        <div>{profileUsername}</div>
      </div>
     
      
      
    </>
  )
}

export default FriendSuggestion