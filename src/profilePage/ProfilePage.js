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
                        <button>
                            <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 150, height: 150 }}
                            />
                        </button>
                    </div>
                    
                    
                </div>

            </header>
        </main>
    </section>
  )
}

export default ProfilePage