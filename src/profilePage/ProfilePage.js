import { Avatar } from '@mui/material'
import React from 'react'
import './ProfilePage.css'

function ProfilePage() {
  return (
    <section className="pP__page__container" >
        <main className="pP__content__container" >
            <header className="pP__header__container">
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
                            <button>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </section>

            </header>
        </main>
    </section>
  )
}

export default ProfilePage