import { Avatar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import './ProfilePage.css'
import { useOutletContext } from 'react-router-dom'

//COMPONENT IMPORTS
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

                <ProfileHeader matches={matches} />

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
                            <img className="category__icon" src={postIcon} />
                            <span className="category__name"  >POSTS</span>
                        </div>
                    </div>
                    <div className="pP__categories">
                        <div className="category__labels">
                            <img  className="category__icon" src={saveIcon} />
                            <span className="category__name"  >SAVED</span>
                        </div>
                    </div>
                    <div className="pP__categories">
                        <div className="category__labels">
                            <img  className="category__icon"src={taggedIcon} />
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