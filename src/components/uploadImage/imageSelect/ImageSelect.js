import React, {useState, useEffect, useRef} from 'react'

import postImage from '../postimage.svg'
import './ImageSelect.css'
import ImageUpload from '../imageUpload/ImageUpload'
import back from '../../../icons/back.svg'

function ImageSelect({username, photoUrl}) {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const inputElement = useRef(null)


  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }
    setSelectedFile(e.target.files[0])   
    
}

  return (
    <div className="imageSelect__position">
          {
            selectedFile ? (
              <div className="imageSelect__box__container">
                
                  <ImageUpload
                    setSelectedFile={setSelectedFile} 
                    selectedFile={selectedFile} 
                    preview={preview}  
                    username={username}
                    photoUrl={photoUrl}
                  />

              </div>
              
            ):(
              <div className="imageSelect__container">
                <div className="imageSelect__header"> 
                  <div className="imageSelect__header__backButtonContainer">
                    {selectedFile && <button><img src={back} alt="back button"/>  </button>}
                  </div>
                  <div className="imageSelect__header__text">
                    <p>Create new post</p> 
                  </div>
                  <div className="imageSelect__header__postButtonContainer">
                    {selectedFile && <button> <p>Post</p> </button>}
                  </div>
                </div> 
                <div className="imageSelect__body">
                  <div >
                    <img src={postImage} alt="post modal image"/> 
                  </div>
                  <div className="imageSelect__body__textContainer">
                    <p className="imageSelect__body__text" >Upload a Picture!</p>
                  </div>
                  
                  <div className="imageSelect__body__inputContainer">
                    <button className="imageSelect__body__button"> 
                      <p className="imageSelect__body__buttonText">Select From Computer</p>
                      <input 
                      className="imageSelect__body__input"
                      name="file"
                      type='file'  
                      accept="image/png, image/jpeg" 
                      onChange={onSelectFile} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          }    
	</div>
  )
}

export default ImageSelect