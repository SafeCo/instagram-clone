import { Avatar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import './ProfilePage.css'
import { useOutletContext} from 'react-router-dom'

//COMPONENT IMPORTS
import ResFollowInfo from './components/resFollowInfo/ResFollowInfo'
import ProfileHeader from './components/profileHeader/ProfileHeader'


//ICON IMPORTS
import plusIcon from '../icons/plus.svg'
import CategoryPost from './components/categoryPost/CategoryPost'
import SaveIcon from './components/icons/SaveIcon'
import CategoryPostIcon from '../icons/CategoryPostIcon'
import TaggedIcon from '../icons/TaggedIcon'

function ProfilePage() {



    const {user} = useOutletContext()
    const [active, setActive] = useState("1")
    const [postNum, setPostNum] = useState(0)
    
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    const handleClick = (event) => {
        setActive(event.currentTarget.id);
    }


    return (
        <section className="pP__page__container" >
            <main className="pP__content__container" >

                <ProfileHeader postNum={postNum} matches={matches} username={user.displayName} profilePic={user.photoURL} id={user.uid} />

                <div className="pP__highlights__container" >
                    <div className="highlight__container">
                        <div className="highlight">
                            <div className="highlight__plus">
                                <img className="highlight__img" src={plusIcon}/>
                            </div>
                            <div className="highlight__new" >New</div>
                        </div>
                    </div>
                </div>

                {!matches && <ResFollowInfo/>}

                <div className="pP__category__container">

                    <div id={"1"} onClick={handleClick} 
                    className={active === "1" ? "pP__categories active":"pP__categories" 
                    }>
                        <div  className="category__labels">
                            {active === "1" ? (
                                    <CategoryPostIcon color={"#262626"} matches={matches} />
                                ): (
                                    <CategoryPostIcon color={"#8e8e8e"} matches={matches} />
                                )
                            }
                            <span className="category__name"  >POSTS</span>
                        </div>
                    </div>

                    <div id={"2"} onClick={handleClick} 
                    className={active === "2" ? "pP__categories active":"pP__categories" 
                    }>
                        <div className="category__labels">
                            {active === "2" ? (
                                    <SaveIcon matches={matches}  color={"#262626"} />
                                ): (
                                    <SaveIcon matches={matches} color={"#8e8e8e"} />
                                )
                            }
                            <span className="category__name"  >SAVED</span>
                        </div>
                    </div>

                    <div id={"3"} onClick={handleClick} 
                    className={active === "3" ? "pP__categories active":"pP__categories" 
                    }>
                        <div className="category__labels">
                            {active === "3" ? (
                                    <TaggedIcon matches={matches} color={"#262626"} />
                                ): (
                                    <TaggedIcon matches={matches} color={"#8e8e8e"} />
                                )
                            }
                            <span className="category__name"  >TAGGED</span>
                        </div>
                    </div>
                </div>
                <CategoryPost username={user.displayName} setPostNum={setPostNum} />

            </main>
        </section>
    )
}

export default ProfilePage