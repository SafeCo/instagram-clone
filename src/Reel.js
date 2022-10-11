import React from 'react'
import Avatar from "@mui/material/Avatar"
import './Reel.css'

const Reel = ({username}) => {
 
  return (
    <>
        <div className="reel__profile">
          <div className="reel__image">
            <Avatar
            className="reel__avatar"
            alt= {username}
            src="/static/images/avatar/1.jpg"
            />
            <div className="reel__avatarRing"></div>
          </div>
            
            <div className="app__reelsName">{username}</div>
        </div>

    </>
  )
}

export default Reel