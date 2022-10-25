import React, {useState, useEffect, useRef} from 'react'

import postImage from './images/postimage.svg'
import './PostModal.css'
import ModalUpload from './ModalUpload'
import back from './icons/back.svg'

function PostModal({username}) {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  const inputElement = useRef(null)

  // const onButtonClick = (e) => {
  //   console.log(inputElement)
  // };

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
    <div className="postModal__position">
          {
            selectedFile ? (
              <div className="postModal__box__container">
                
                  <ModalUpload 
                    setSelectedFile={setSelectedFile} 
                    selectedFile={selectedFile} 
                    preview={preview}  
                    username={username}
                  />

              </div>
              
            ):(
              <div className="postModal__container">
                <div className="postModal__header"> 
                  <div className="postModal__header__backButtonContainer">
                    {selectedFile && <button><img src={back} alt="back button"/>  </button>}
                  </div>
                  <div className="postModal__header__text">
                    <p>Create new post</p> 
                  </div>
                  <div className="postModal__header__postButtonContainer">
                    {selectedFile && <button> <p>Post</p> </button>}
                  </div>
                </div> 
                <div className="postModal__body">
                  <div >
                    <img src={postImage} alt="post modal image"/> 
                  </div>
                  <div className="postModal__body__textContainer">
                    <p className="postModal__body__text" >Upload a Picture!</p>
                  </div>
                  
                  <div className="postModal__body__inputContainer">
                    <button className="postModal__body__button"> 
                      <p className="postModal__body__buttonText">Select From Computer</p>
                      <input 
                      className="postModal__body__input"
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

export default PostModal