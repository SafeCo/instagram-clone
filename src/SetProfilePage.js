import React,{useState, useEffect} from 'react'
import './SetProfilePage.css'
import { auth } from './firebase';
import SetProfileBio from './SetProfileBio'
import SetProfilePic from './SetProfilePic'

function SetProfilePage() {

    const [skip, setSkip] = useState(false)
    const [newImage, setNewImage] =useState()
    const [file, setFile] = useState()

    const switchSkip = ()=>{
        setSkip(!skip)
    }

    //this function gets the fileURL so it displays in browser and the actual file itself to be uploaded.

    const getFile = (fileObj, base)=>{
        setNewImage(fileObj)
        setFile(base)
    }

    
    return (
        <div className="sPPage__container">
        {skip? (
            <SetProfileBio switchSkip={switchSkip} newImage={newImage} imageFile={file}  setNewImage={setNewImage}/>
        ):(
            <SetProfilePic switchSkip={switchSkip} getFile={getFile}/>
        )}
        </div>
    )
}

export default SetProfilePage