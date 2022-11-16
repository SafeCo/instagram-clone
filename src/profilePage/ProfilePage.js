import { Avatar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import './ProfilePage.css'
import { useOutletContext } from 'react-router-dom'

//COMPONENT IMPORTS
import FollowInfo from './components/followInfo/FollowInfo'
import ResFollowInfo from './components/resFollowInfo/ResFollowInfo'
import ProfileHeader from './components/profileHeader/ProfileHeader'


//ICON IMPORTS
import optionsIcon from '../icons/options.svg'
import plusIcon from '../icons/plus.svg'
import postIcon from '../icons/postIcons.svg'
import saveIcon from '../icons/save.svg'
import taggedIcon from '../icons/taggedIcon.svg'

import testImage from './diamond.png'

function ProfilePage() {

    const [user, setUser] = useOutletContext()

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    return (
        <section className="pP__page__container" >
            <main className="pP__content__container" >

                <ProfileHeader/>
                {/* <header className="pP__header__container">
                    <div className="pP__profilePic__container">
                        <div className="pP__profilePic__buttonContainer">
                            <button className="pP__profilePic__button">
                                <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 150, height: 150 }}
                                />
                            </button>
                        </div>                    
                    </div>
                    <section className="pP__profileInfo__container">
                        <div className="pP__profileInfo__firstRow" >
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
                        {matches && <FollowInfo/>}
                        <div className="pP__profileInfo__thirdRow" >
                            <div className="thirdRow__caption">
                            BIO SHOULD CONTAIN A MAX OF 150 CHARACTERS
                            </div>
                        </div>
                    </section>
                </header> */}


                <div className="pP__highlights__container" >
                    <div className="highlight__container">
                        <div className="highlight">
                            <div className="highlight__plus">
                                <img src={plusIcon}/>
                            </div>
                            <div className="highlight__new" >New</div>
                        </div>
                    </div>
                </div>

                {!matches && <ResFollowInfo/>}

                <div className="pP__category__container">
                    <div className="pP__categories borderTop">
                        <div className="category__labels">
                            <img src={postIcon} />
                            <span className="category__name"  >POSTS</span>
                        </div>
                    </div>
                    <div className="pP__categories">
                        <div className="category__labels">
                            <img  className="category__saveIcon" src={saveIcon} />
                            <span className="category__name"  >SAVED</span>
                        </div>
                    </div>
                    <div className="pP__categories">
                        <div className="category__labels">
                            <img src={taggedIcon} />
                            <span className="category__name"  >TAGGED</span>
                        </div>
                    </div>
                </div>
                <div className="pP__posts__container">
                    <div className="pP__posts__collection">
                        <div className="pP__posts__row" >
                            <div className="pP__post__container" >
                                    <img  className="pP__post__image" src={testImage}  />
                            </div>
                            <div className="pP__post__container" >
                                    <img  className="pP__post__image" src={testImage}  />
                            </div>
                            <div className="pP__post__container" >
                                    <img  className="pP__post__image" src={testImage}  />
                            </div>
                        </div>
                        <div className="pP__posts__row" >
                            <div className="pP__post__container" >
                                <div className="pP__post">Square</div>
                            </div>
                            <div className="pP__post__container" >
                                <div className="pP__post">Square</div>
                            </div>
                            <div className="pP__post__container" >
                                <div className="pP__post">Square</div>
                            </div>
                            

                        </div>

                    </div>
                    
                </div>









            </main>
        </section>
    )
}

export default ProfilePage