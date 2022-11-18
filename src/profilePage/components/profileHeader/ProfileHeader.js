import React from 'react'
import './ProfileHeader.css'

import { Avatar } from '@mui/material'
import optionsIcon from '../../../icons/options.svg'

function ProfileHeader({matches, username, profilePic}) {

    return (
        <>
            <header className="pH__header__container">
                <div className="pH__profilePic__container">
                    <div className="pH__profilePic__buttonContainer">
                        <button className="pH__profilePic__button">
                            { matches?
                                (<Avatar
                                alt={username}
                                src={profilePic}
                                sx={{ width: 150, height: 150 }}
                                />)
                                :
                                (<Avatar
                                alt={username}
                                src={profilePic}
                                sx={{ width: 77, height: 77 }}
                                />)
                            }
                        </button>
                    </div>                    
                </div>
                <section className="pH__profileInfo__container">
                    <div className="pH__profileInfo__firstRow" >
                        <h2 className="firstRow__name" >{username}</h2>
                        
                        { matches &&
                            <div className="firstRow__editButtonContainer">
                                <button className="firstRow__editButton">
                                    Edit Profile
                                </button>
                            </div>
                        }

                        <div className="firstRow__optionsButtonContainer">
                            <button className="firstRow__optionsButton" >
                                <img src={optionsIcon}   />
                            </button>
                        </div>
                    </div>
                    { !matches &&
                        <div className="firstRow__editButtonContainer">
                            <button className="firstRow__editButton">
                                Edit Profile
                            </button>
                        </div>
                    }
                    { matches &&
                        <ul className="pH__profileInfo__secondRow" >
                        <li className="secondRow__posts" >
                            <div className="secondRow__text">
                                <span className="secondRow__num" >!! </span>
                                posts
                            </div>
                        </li>
                        <li className="secondRow__followers" >
                            <div className="secondRow__text">
                                <span className="secondRow__num" >!! </span>
                                followers
                            </div>
                        </li>
                        <li className="secondRow__following" >
                            <div className="secondRow__text">
                                <span className="secondRow__num" >!! </span>
                                following
                            </div>
                        </li>
                    </ul>
                    }

                    { matches && 
                        <div className="pH__profileInfo__thirdRow" >
                            <div className="thirdRow__bio">
                                BIO SHOULD CONTAIN A MAX OF 150 CHARACTERS
                            </div>
                        </div>
                    }
                </section>
            </header>
            { !matches && 
                <div className="pH__profileInfo__thirdRow" >
                    <div className="thirdRow__bio">
                        BIO SHOULD CONTAIN A MAX OF 150 CHARACTERS
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileHeader