import { Avatar } from '@mui/material'
import React,{useState} from 'react'
import './SetProfileBio.css'

function SetProfileBio({switchSkip, newImage}) {
    const [biography, setBiography] = useState()

    console.log(newImage)

  return (
    <div>
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
        <textarea 
          className="sPB__caption"
          type="text" 
          placeholder="Write a caption..." 
          onChange={event => setBiography(event.target.value) } value={biography}>
        </textarea>
        <button>go to home</button>
        <button onClick={()=>switchSkip()} >go Back</button>
      </div>
    </div>
    
  )
}

export default SetProfileBio