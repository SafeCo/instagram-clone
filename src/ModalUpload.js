import React from 'react'
import back from './icons/back.svg'
import './ModalUpload.css'

function ModalUpload({setSelectedFile, selectedFile, preview}) {
  return (
    <>
			<div className="postModal__container">
				<div className="postModal__header"> 
					<div className="postModal__header__backButtonContainer">
						<button onClick={()=>{setSelectedFile(null)}}><img src={back} alt="back button"/></button>
					</div>
					<div className="postModal__header__text">
						<p>Create new Post</p> 
					</div>
					<div className="postModal__header__postButtonContainer">
						<button>
							<p>Post</p>
						</button>
					</div>
				</div> 

				<div className="modalUpload__previewContainer">
					<div className="modalUpload__imageContainer">
						{selectedFile && <img className="modalUpload__image" src={preview} />}
					</div>
					<div className="modalUpload__captionContainer">

					</div>
					
				</div>
			</div>
    </>
  )
}

export default ModalUpload