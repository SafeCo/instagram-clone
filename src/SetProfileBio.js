import React,{useState} from 'react'

function SetProfileBio({switchSkip, newImage}) {
    const [biography, setBiography] = useState()
    console.log(newImage)
  return (
    <div className="sPP__box">
        { newImage && <div className="sPP__imageContainer">
                <img className="modalUpload__image" src={newImage} />
        </div>}
    	<textarea 
            type="text" 
            placeholder="Write a caption..." 
            onChange={event => setBiography(event.target.value) } value={biography}>
        </textarea>
        <button>go to home</button>
        <button onClick={()=>switchSkip()} >go Back</button>
    </div>
  )
}

export default SetProfileBio