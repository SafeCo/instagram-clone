import React,{useState} from 'react'
import Avatar from "@mui/material/Avatar"
import { Outlet } from 'react-router-dom'


//Components
import HomeIcon from './icons/HomeIcon'
import SendIcon from './icons/SendIcon'
import PostIcon from './icons/PostIcon'
import ExploreIcon from './icons/ExploreIcon'
import HeartIcon from './icons/HeartIcon'

function TestNav() {
	const [modalChild, setModalChild]= useState("")
	const [modalOpen, setModalOpen] = useState(false)


    // Checks which buttons are active
    const [buttonState, setButtonState] = useState([
        {name: "home", isActive: true},
        {name: "send", isActive: false},
        {name: "post", isActive: false},
        {name: "explore", isActive: false},
        {name: "heart", isActive: false},
        {name: "profile", isActive: false},
    ])

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
            const update = buttonState.map((item)=>{
                if(item.name === e.currentTarget.name){
                    return {name: item.name, isActive: true}
                }else{
                    return{name: item.name, isActive: false}
                }
            })
            setButtonState(update)
        } else{
            const update = buttonState.map((item)=>{
                if(item.name === e){
                    return {name: item.name, isActive: true}
                }else{
                    return{name: item.name, isActive: false}
                }
            })
            setButtonState(update)
        }        
    }


	

  return (
    <>
        <div className="app__headerIcons">
            <div className="app__headerIconContainer">
                <button name="home" onClick={(e)=>{setHistory(); updateButtonState(e)}} className="app__headerIconButton" >
                    <HomeIcon buttonState={buttonState[0]}/>
                </button>
     
            </div>
            
            <div className="app__headerIconContainer">
                <button 
                    name="send"  
                    onClick={(e)=>{setHistory(); updateButtonState(e)}} 
                    className="app__headerIconButton" >
                        <SendIcon buttonState={buttonState[1]}/>
                </button>
            </div>

            <div className="app__headerIconContainer">
                <button 
                    name="post" 
                    onClick={(e) => { 
                    setHistory(); 
                    updateButtonState(e);
                }} 
				className="app__headerIconButton">
                    {/* <img name="post" className="app__headerIcon" src={post} alt='post button'/> */}
                    <PostIcon buttonState={buttonState[2]} />
                </button>
            </div>

            <div className="app__headerIconContainer">
                <button 
                    name="explore" 
                    onClick={(e)=>{setHistory(); updateButtonState(e)}} 
                    className="app__headerIconButton" >
                    <ExploreIcon buttonState={buttonState[3]}/>
                </button>
            </div>

            <div className="app__headerIconContainer">
                <button 
                    name="heart" 
                    onClick={(e)=>{setHistory(); updateButtonState(e)}} 
                    className="app__headerIconButton" >
                    <HeartIcon buttonState={buttonState[4]}/>
                </button>
            </div>
            <div className="app__headerIconContainer">
                <Avatar
                className="app__headerIcon"
                alt="hello"
                sx={{ width: 23, height: 23 }}
                src="/static/images/avatar/1.jpg"
                />
            </div>
        </div>
        <Outlet/>
    </>
  )
}

export default TestNav