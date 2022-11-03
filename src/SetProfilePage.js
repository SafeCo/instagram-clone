import React,{useState} from 'react'
import './SetProfilePage.css'
import SetProfileBio from './SetProfileBio'
import SetProfilePic from './SetProfilePic'

function SetProfilePage() {

    const [skip, setSkip] = useState(false)
    const [newImage, setNewImage] =useState()

    const switchSkip = ()=>{
        setSkip(!skip)
    }

    const getFileObj = (fileObj)=>{
        setNewImage(fileObj)
    }

    
    return (
        <div className="sPPage__container">
        {skip? (
            <SetProfileBio switchSkip={switchSkip} newImage={newImage} setNewImage={setNewImage}/>
        ):(
            <SetProfilePic switchSkip={switchSkip} getFileObj={getFileObj}/>
        )}
        </div>
    )
}

export default SetProfilePage