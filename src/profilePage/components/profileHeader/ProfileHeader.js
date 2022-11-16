import React from 'react'
import './ProfileHeader.css'

import { Avatar } from '@mui/material'
import optionsIcon from '../../../icons/options.svg'

function ProfileHeader() {
    return (
        <header className="pH__header__container">
            <div className="pH__profilePic__container">
                <div className="pH__profilePic__buttonContainer">
                    <button className="pH__profilePic__button">
                        <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 150, height: 150 }}
                        />
                    </button>
                </div>                    
            </div>
            <section className="pH__profileInfo__container">
                <div className="pH__profileInfo__firstRow" >
                    <h2 className="firstRow__name" >USERNAME</h2>
                    <div className="firstRow__editButtonContainer" >
                        <button className="firstRow__editButton">
                            Edit Profile
                        </button>
                    </div>
                    <div className="firstRow__optionsButtonContainer">
                        <button className="firstRow__optionsButton" >
                            <img src={optionsIcon}   />
                        </button>
                    </div>
                </div>
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
                <div className="pH__profileInfo__thirdRow" >
                    <div className="thirdRow__caption">
                    BIO SHOULD CONTAIN A MAX OF 150 CHARACTERS
                    </div>
                </div>
            </section>

        </header>
    )
}

export default ProfileHeader