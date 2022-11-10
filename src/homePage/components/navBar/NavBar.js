import React from 'react'
import './NavBar.css'
import InstaLogo from '../../../instagram-text-icon.svg'
import SearchBar from '../searchBar/SearchBar'
import NavIcons from '../navIcon/NavIcons'

function NavBar({userProfilePic, username, userId}) {
    return (
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
                    <NavIcons userProfilePic={userProfilePic} username={username} userId={userId}/>
                </div>
            </div>	
        </nav>
    )
}

export default NavBar