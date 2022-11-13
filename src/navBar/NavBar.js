import React, {useState, useEffect} from 'react'
import './NavBar.css'
import AuthContext from '../hooks/useAuth'

import InstaLogo from '../instagram-text-icon.svg'
import SearchBar from '../homePage/components/searchBar/SearchBar'
import NavIcons from './navIcon/NavIcons'

import { auth } from '../firebase';
import { Outlet } from 'react-router-dom'


// USECONTEXT for user
// store icons data in context 
// see what is going on with local storage

function NavBar() {

    // To find out the height of the Navbar to minus from the outlet page height.

    const [user, setUser]= useState([])
	useEffect(()=>{
        
		auth.onAuthStateChanged((userObj)=>{
			if(userObj){
				setUser(userObj)
			}
		})
        
	},[])

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
                        <NavIcons userProfilePic={user.photoURL} username={user.displayName} userId={user.uid}/>
                    </div>
                </div>	
            </nav>
            <Outlet />
        </>
        
    )
}

export default NavBar