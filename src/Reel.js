import React from 'react'
import Avatar from "@mui/material/Avatar"
import './Reel.css'

const Reel = ({list}) => {
  console.log(list)

  const uniqueIds = [];
    const unique = list.filter(element => {
      const isDuplicate = uniqueIds.includes(element.username);
      if (!isDuplicate) {
        uniqueIds.push(element.username);

        return true;
      }

      return false;
    });

  return (
    <>
      {
        unique.map(({username, id}) =>{
        return <div key={id} className="reel__profile">
                  <div className="reel__image">
                    <Avatar
                    className="reel__avatar"
                    sx={{ width: 55, height: 55 }}
                    alt= {username}
                    src="/static/images/avatar/1.jpg"
                    />

                    <div className="reel__avatarRing"></div>         

                  </div>
                  <div className="app__reelsNameContainer">
                      <div className="app__reelsName">{username}</div>
                    </div>
                </div> 
      }) 
      }
    </>
  )
}

export default Reel