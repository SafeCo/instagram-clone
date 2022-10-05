import React from 'react'
import Avatar from "@mui/material/Avatar"

const FriendSuggestion = ({username}) => {
  return (
    <div className='FriendSuggestion__profile'>
      <Avatar
        className="post__avatar"
        alt= {username}
        src="/static/images/avatar/1.jpg"
      />
      <div>{username}</div>
    </div>
  )
}

export default FriendSuggestion