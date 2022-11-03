import React,{useState} from 'react'
import './SetProfileBio.css'

function SetProfileBio({switchSkip, newImage}) {
    const [biography, setBiography] = useState()

  return (
    <div>
      <div className="sPB__box">
        { newImage && 
          <div className="sPB__imageContainer">
            <img className="sPB__image" src={newImage} />
          </div>
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