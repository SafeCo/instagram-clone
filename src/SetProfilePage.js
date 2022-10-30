import React, {useState, useEffect} from 'react'
import './SetProfilePage.css'
import ZoomImage from './ZoomImage'

function SetProfilePage() {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

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
    <div className="sPP__container">
        <div className="sPP__box">
           
                <ZoomImage image={preview} />
            
            
            <div className="sPP__imageContainer">
            {selectedFile && <img className="modalUpload__image" src={preview} />}
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
            <div>button that says skip</div>
        </div>
    </div>
  )
}

export default SetProfilePage