import React from 'react'
import Avatar from "@mui/material/Avatar"
import './Reel.css'

const Reel = ({list}) => {
  console.log(list);
 
  return (
    <>
      {
        list.forEach((prop) =>{
          console.log(prop.username)
        })
      }
    </>
  )
}

export default Reel

{/* <div key={prop.id} className="reel__profile">
          <div className="reel__image">
            <Avatar
            className="reel__avatar"
            sx={{ width: 55, height: 55 }}
            alt= {username}
            src="/static/images/avatar/1.jpg"
            />
            <div className="reel__avatarRing"></div>
          </div>
            <div className="app__reelsName">{prop.username}</div>
        </div> */}