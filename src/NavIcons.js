import React,{useState} from 'react'
import Avatar from "@mui/material/Avatar"
import home_inUse from './icons/home_inUse.svg'
import send from './icons/send.svg'
import post from './icons/post.svg'
import explore from './icons/explore.svg'
import heart from './icons/heart.svg'

import ModalWrapper from './ModalWrapper'
import PostModal from './PostModal'

function NavIcons({username}) {
	const [modalChild, setModalChild]= useState("")
	const [modalOpen, setModalOpen] = useState(false)

	const modalSwitchOpen= (e)=>{
		switch(e.target.name){
			case "newPost":
				setModalChild(
					<PostModal
						username={username}
					/>
					)
				break;
			default :
				break;
		}
		setModalOpen(!modalOpen)
	}

  return (
    <>
        {modalOpen && 
					<ModalWrapper modalState={modalOpen} modalSwitch={modalSwitchOpen}>
						{modalChild}
					</ModalWrapper>
				}

        <div className="app__headerIcons">
            <div className="app__headerIconContainer">
                <button className="app__headerIconButton" >
                    <img className="app__headerIcon" src={home_inUse} alt='home use button'/>
                </button>
            </div>
            
            <div className="app__headerIconContainer">
                <button className="app__headerIconButton" >
                <img className="app__headerIcon" src={send} alt='send button'/>
                </button>
            </div>

            <div className="app__headerIconContainer">
                <button onClick={(e) => { 
                    modalSwitchOpen(e)
                	}} 
									className="app__headerIconButton" 
								>
                    <img name="newPost" className="app__headerIcon" src={post} alt='post button'/>
                </button>
            </div>

            <div className="app__headerIconContainer">
                <button className="app__headerIconButton" >
                    <img className="app__headerIcon" src={explore} alt='explore button'/>
                </button>
            </div>

            <div className="app__headerIconContainer">
                <button className="app__headerIconButton" >
                    <img className="app__headerIcon" src={heart} alt='heart button'/>
                </button>
            </div>
            <div className="app__headerIconContainer">
                <Avatar
                className="app__headerIcon"
                alt={username}
                sx={{ width: 23, height: 23 }}
                src="/static/images/avatar/1.jpg"
                />
            </div>
            
        </div>
    </>
  )
}

export default NavIcons