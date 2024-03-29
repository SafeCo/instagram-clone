import React, {useState, useEffect} from 'react'
import './NavBar.css'

import InstaLogo from './images/instagramTextIcon.svg'
import SearchBar from './searchBar/SearchBar'
import NavIcons from './navIcon/NavIcons'

import { db, auth } from '../firebase';
import { Outlet } from 'react-router-dom'


function NavBar() {
    

    // To find out the height of the Navbar to minus from the outlet page height.

    const [user, setUser]= useState([])
    const [userInfo, setUserInfo]= useState([])
    const [reelAndSug, setReelAndSug] = useState([])

	useEffect(()=>{  
		const unsubscribe = auth.onAuthStateChanged((userObj)=>{
			if(userObj){
				setUser(userObj)
			}
		})   
        return ()=> unsubscribe();        
	},[])

    useEffect(()=>{
        const unsubscribe = db.collection('usernames')
        .doc(user.uid)
        .onSnapshot((doc)=>{
            setUserInfo(doc.data())
        })  
        return ()=> unsubscribe();        
	},[user.uid])

    useEffect(()=>{
        const userProfileName = String(userInfo.username)
        db.collection("usernames")
        .where("username", "!=", userProfileName)
        .limit(11)
        .get()
        .then((querySnapshot) => {
            setReelAndSug(querySnapshot.docs.map((docs)=>{
            return docs.data()
            }))
        });
    }, [userInfo]);


    return (
        <>
            <nav className='nB__headerContainer'>
                <div className="nB__header">
                    <div className="nB__headerImageFlex">
                        <img
                            className="nB__headerImage"
                            src={InstaLogo}
                            alt="instagram logo"
                        />
                    </div>

                    <div className="nB__header__searchBarFlex">
                        <SearchBar/>
                    </div>  
                        
                    <div className="nB__headerIconsFlex">
                        <NavIcons userProfilePic={userInfo.photoUrl} username={userInfo.username} userId={user.uid}/>
                    </div>
                </div>	
            </nav>
            <Outlet context={{user, userInfo, reelAndSug}} />
        </>
    )
}

export default NavBar