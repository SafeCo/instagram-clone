import React,{useState, useEffect} from 'react'

import {auth } from '../firebase';


import './EditProfilePage.css'
import SetProfileBio from './components/editProfileBio/EditProfileBio'
import SetProfilePic from './components/editProfilePic/EditProfilePic'

function EditProfilePage() {

    const [skip, setSkip] = useState(false)
    const [newImage, setNewImage] =useState()
    const [file, setFile] = useState()
    const [user, setUser]= useState([])

	useEffect(()=>{
		auth.onAuthStateChanged((userObj)=>{
			if(userObj){
				setUser(userObj)
			}
		})
	},[])



    const switchSkip = ()=>{
        setSkip(!skip)
    }

    //this function gets the fileURL so it displays in browser and the actual file itself to be uploaded.

    const getFile = (fileObj, base)=>{
        setNewImage(fileObj)
        setFile(base)
    }
    
    return (
        <div className="ePPage__container">
        {skip? (
            <SetProfileBio photoUrl={user.photoURL} switchSkip={switchSkip} newImage={newImage} imageFile={file}  setNewImage={setNewImage}/>
        ):(
            <SetProfilePic photoUrl={user.photoURL} switchSkip={switchSkip} getFile={getFile}/>
        )}
        </div>
    )
}

export default EditProfilePage