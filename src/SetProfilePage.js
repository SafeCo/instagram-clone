import React, {useState, useEffect} from 'react'
import './SetProfilePage.css'
import ZoomImage from './ZoomImage'

function SetProfilePage() {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [newImage, setNewImage]= useState()

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

    const getNewImage = (newimage)=>{
        const objectUrl = URL.createObjectURL(newimage)
        setNewImage(objectUrl)
    }

//TASK IS TO CALL CONVERTCANVAS FUNCTION FROM ZOOMIMAGE BY CLICKING BUTTON IN SETPROFILEPAGE

  return (
    <div className="sPP__container">
        <div className="sPP__box">
                <ZoomImage image={preview} getNewImage={getNewImage}/>
            <div className="sPP__imageContainer">
            {newImage && <img className="modalUpload__image" src={newImage} />}
            </div>
            <div>message that says add a profile pic</div>
            <div className="sPP__buttonContainer">
                    <input 
                      name="file"
                      type='file'  
                      accept="image/png, image/jpeg" 
                      onChange={onSelectFile} 
                      />
            </div>
            <div>
                <button>accept preview image</button>
            </div>
            <div>button that says skip</div>
        </div>
    </div>
  )
}

export default SetProfilePage