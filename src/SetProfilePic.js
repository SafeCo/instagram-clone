import { Avatar } from '@mui/material'
import React,{useState, useEffect, useRef} from 'react'
import ZoomImage from './ZoomImage'
import './SetProfilePic.css'

function SetProfilePic({switchSkip, getFileObj}) {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [newImage, setNewImage]= useState()
    const clickRef = useRef()

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

    const getNewImage = (base)=>{
        const objectUrl = URL.createObjectURL(base)
        setNewImage(objectUrl)
        getFileObj(objectUrl)
    }
    const canvasToObj = ()=>{
        clickRef.current?.convertFunc()
    }



//TASK IS TO CALL CONVERTCANVAS FUNCTION FROM ZOOMIMAGE BY CLICKING BUTTON IN SETPROFILEPAGE:: COMPLETED
// CAN SIMPLIFY by sending a function as props that returns canvas base 64 data


  return (
        <div className="sPP__boxContainer">
            <div className="sPP__box">
                    {selectedFile ? 
                        (<ZoomImage ref={clickRef} image={preview} getNewImage={getNewImage} />):
                        (<Avatar sx={{ width: 200, height: 200 }} />)
                    }

                <div className="sPP__textContainer">
                    {selectedFile ? 
                        (<p>Adjust your picture by zooming in and dragging</p>):
                        (<p>Add a profile picture</p>) 
                    }
                </div>
                <div className="sPP__body__inputContainer">
                        <button className="sPP__body__button"> 
                        <p className="sPP__body__buttonText">Select From Computer</p>
                        <input 
                        className="sPP__body__input"
                        name="file"
                        type='file'  
                        accept="image/png, image/jpeg" 
                        onChange={onSelectFile} 
                        />
                        </button>
                    </div>
                <div>
                    {selectedFile && (
                        <button onClick={()=>{canvasToObj(); switchSkip()}} 
                        >accept preview image
                        </button>
                        )
                    }
                </div>
                <button 
                    onClick={()=> {
                    
                        switchSkip() 
                        }} 
                    >Skip
                </button>
            </div>
        </div>
  )
}

export default SetProfilePic