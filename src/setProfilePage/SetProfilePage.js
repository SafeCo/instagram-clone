import React,{useState, useEffect} from 'react'
import { useOutletContext } from 'react-router-dom';

import {auth } from '../firebase';


import './SetProfilePage.css'
import SetProfileBio from './components/setProfileBio/SetProfileBio'
import SetProfilePic from './components/setProfilePic/SetProfilePic'

function SetProfilePage() {

    const [skip, setSkip] = useState(false)
    const [newImage, setNewImage] =useState()
    const [file, setFile] = useState()
    const [user, setUser]= useState([])
    const {navBarHeight} = useOutletContext()


        // To get the height of the Navbar to minus from the outlet page height
    useEffect(()=>{
        document.documentElement.style.setProperty('--navBarHeight', (navBarHeight + 1 )+ "px");
	},[navBarHeight])


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
        <div className="sPPage__container">
        {skip? (
            <SetProfileBio switchSkip={switchSkip} newImage={newImage} imageFile={file}  setNewImage={setNewImage}/>
        ):(
            <SetProfilePic photoUrl={user.photoURL} switchSkip={switchSkip} getFile={getFile}/>
        )}
        </div>
    )
}

export default SetProfilePage