import React, {useState, useEffect, useRef, useOutletContext} from 'react'
import './NavBar.css'
import AuthContext from '../../../hooks/useAuth'

import InstaLogo from '../../../instagram-text-icon.svg'
import SearchBar from '../searchBar/SearchBar'
import NavIcons from '../navIcon/NavIcons'

import { auth } from '../../../firebase';
import { Outlet } from 'react-router-dom'


// USECONTEXT for user
// store icons data in context 
// see what is going on with local storage

function NavBar() {

    // To find out the height of the Navbar to minus from the outlet page height.
    const navBarRef = useRef(null)
    const [navBarHeight, setNavBarHeight] = useState()

    const [user, setUser]= useState([])
	useEffect(()=>{
        setNavBarHeight(
            navBarRef.current.clientHeight
        )
		auth.onAuthStateChanged((userObj)=>{
			if(userObj){
				setUser(userObj)
			}
		})
        
	},[])

    return (
        <>
            <nav ref={navBarRef} className='nB__headerContainer'>
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
            <Outlet context={{navBarHeight}} />
        </>
        
    )
}

export default NavBar