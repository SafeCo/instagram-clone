import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import './SetProfileBio.css'

function SetProfileBio({switchSkip, newImage, setNewImage}) {
    const [biography, setBiography] = useState()

    console.log(newImage)

  return (
    <div className="sPB__boxContainer">
      <div className="sPB__box">
        { newImage ? (
          <Avatar
							sx={{ width: 200, height: 200 }}
							src={newImage}
					/>
          ):(
            <Avatar
							sx={{ width: 200, height: 200}}
							
					/>
          )
          
        }
        <div className="sPB__captionContainer">
          <textarea 
            maxLength="150"
            className="sPB__caption"
            type="text" 
            placeholder="Write a caption..." 
            onChange={event => setBiography(event.target.value) } value={biography}>
          </textarea>
        </div>
       
        <div className="sPB__buttonContainer" >
          <button className="sPB__button">
            <p>Continue</p>
          </button>
        </div>
        <div className="sPB__buttonContainer__alt">
          <button className="sPB__button__alt" onClick={()=>{setNewImage(); switchSkip()}} >
            <p>Back</p>
          </button>
        </div>
      </div>
    </div>
    
  )
}

export default SetProfileBio