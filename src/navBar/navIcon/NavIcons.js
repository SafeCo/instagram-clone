import React, {useState, useEffect} from 'react'
import Avatar from "@mui/material/Avatar"
import './NavIcons.css'
import { Link, useLocation } from 'react-router-dom'



//Components
import ModalWrapper from '../../globalComponents/modalWrapper/ModalWrapper';
import ImageSelect from '../uploadImage/imageSelect/ImageSelect'

import HomeIcon from '../../icons/HomeIcon'
import SendIcon from '../../icons/SendIcon'
import PostIcon from '../../icons/PostIcon'
import ExploreIcon from '../../icons/ExploreIcon'
import HeartIcon from '../../icons/HeartIcon'

function NavIcons({username, userProfilePic, userId}) {
	const [modalChild, setModalChild]= useState("")
	const [modalOpen, setModalOpen] = useState(false)

    //Use location to manage which icon is higlighted in the navicons bar.


    


    // Checks which buttons are active
    // profile was heart before
    const [buttonState, setButtonState] = useState([
        {name: "/", isActive: true},
        {name: "send", isActive: false},
        {name: "post", isActive: false},
        {name: "explore", isActive: false},
        {name: "/profile", isActive: false},
        {name: "/addprofile", isActive: false},
    ])

    // When page loads checks path and activates icons according to page
    const { pathname } = useLocation()

    useEffect(() => {
        const update = buttonState.map((page)=>{
            if(page.name === pathname){
                return {name: page.name, isActive: true}
            }else{
                return{name: page.name, isActive: false}
            }
        })
        setButtonState(update)
    }, [pathname]);


    //used to track the last active button
    const [buttonStateHistory, setButtonStateHistory] = useState()
    const setHistory =()=>{
       const wasActive = buttonState.filter((item)=>{
            return item.isActive === true
        })
        setButtonStateHistory(wasActive)
    }

    // When button clicked updates button state as the active button and switches the others to not active
    const updateButtonState = (e)=>{
        if(e?.currentTarget){
            const update = buttonState.map((page)=>{
                if(page.name === e.currentTarget.name){
                    return {name: page.name, isActive: true}
                }else{
                    return{name: page.name, isActive: false}
                }
            })
            setButtonState(update)
        } else{
            const update = buttonState.map((page)=>{
                if(page.name === e){
                    return {name: page.name, isActive: true}
                }else{
                    return{name: page.name, isActive: false}
                }
            })
            setButtonState(update)
        }        
    }


	const modalSwitchOpen= (e)=>{
		switch(e.currentTarget.name){
			case "post":
				setModalChild(
					<ImageSelect
						username={username}
                        userProfilePic={userProfilePic}
                        userId={userId}
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
        {/* Added button props to modalwrapper so when modal exits the active button is reverted to the button prior to the modal being opened e.g. Home, then post button, exit post modal, button reverts to home */}
        {modalOpen && 
            <ModalWrapper modalState={modalOpen} modalSwitch={modalSwitchOpen} buttonStateHistory={buttonStateHistory} updateButtonState={updateButtonState}>
                {modalChild}
            </ModalWrapper>
		}

        <div className="nI__headerIcons">
            <div className="nI__headerIconContainer">
                <button name="/" onClick={(e)=>{setHistory(); updateButtonState(e)}} className="nI__headerIconButton" >
                    <Link to="/">
                        <HomeIcon buttonState={buttonState[0]}/>
                    </Link>
                </button>
     
            </div>
            
            <div className="nI__headerIconContainer">
                <button 
                    name="send"  
                    onClick={(e)=>{setHistory(); updateButtonState(e)}} 
                    className="nI__headerIconButton" >
                        <SendIcon buttonState={buttonState[1]}/>
                </button>
            </div>

            <div className="nI__headerIconContainer">
                <button 
                    name="post" 
                    onClick={(e) => { 
                    setHistory(); 
                    updateButtonState(e);
                    modalSwitchOpen(e)
                }} 
				className="nI__headerIconButton">
                    {/* <img name="post" className="nI__headerIcon" src={post} alt='post button'/> */}
                    <PostIcon buttonState={buttonState[2]} />
                </button>
            </div>

            <div className="nI__headerIconContainer">
                <button 
                    name="explore" 
                    onClick={(e)=>{setHistory(); updateButtonState(e)}} 
                    className="nI__headerIconButton" >
                    <ExploreIcon buttonState={buttonState[3]}/>
                </button>
            </div>

            <div className="nI__headerIconContainer">
                <Link to="profile">
                    <button 
                    //name below formerly heart
                        name="/profile" 
                        onClick={(e)=>{setHistory(); updateButtonState(e)}} 
                        className="nI__headerIconButton" >
                        <HeartIcon buttonState={buttonState[4]}/>
                    </button>
                </Link>
            </div>
            <div className="nI__headerIconContainer">
                <Link to="addprofile">
                    <button
                    name="/addprofile" 
                    onClick={(e)=>{setHistory(); updateButtonState(e)}} 
                    className="nI__headerIconButton" 
                    >
                        <Avatar
                        className="nI__headerIcon"
                        alt={
                            userProfilePic ? username : userProfilePic
                        }
                        sx={{ width: 23, height: 23 }}
                        src={userProfilePic}
                        />    
                    </button>
                    
                </Link>
            </div>
            
        </div>
    </>
  )
}

export default NavIcons