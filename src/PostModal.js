import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import postImage from './images/postimage.svg'
import './PostModal.css'
import ModalUpload from './ModalUpload'
import back from './icons/back.svg'

function PostModal({ open, onClose, username}) {
	const style = {
		position: 'absolute',
    borderRadius: 3,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
	};
  const styleTwo = {
		position: 'absolute',
    borderRadius: 3,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 700,
		bgcolor: 'background.paper',
		boxShadow: 24,
	};

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()


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

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
}


  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          {
            selectedFile ? (
              <Box sx={styleTwo}>
                <ModalUpload 
                  onClose={onClose}
                  setSelectedFile={setSelectedFile} 
                  selectedFile={selectedFile} 
                  preview={preview}  
                  username={username}
                />
              </Box>
            ):(
            <Box sx={style}>
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
                <div>
                  <img src={postImage} alt="post modal image"/> 
                </div>
                <input type='file' onChange={onSelectFile} />
              </div>
            </Box>
            )
          }    
	</Modal>
  )
}

export default PostModal