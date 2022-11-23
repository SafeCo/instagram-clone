import React, {useState} from 'react'
import './PostIcons.css'

import commentIcon from '../../../../icons/comment.svg'
import send from '../../../../icons/send.svg'
import SaveIcon from '../../../../icons/SaveIcon'
import Like from '../../../../icons/Like';


function PostIcons({modalSwitchOpen}) {

  const [likeClick, setLikeClick] = useState(false)
  const [saveClick, setSaveClick] = useState(false)


  return (
    <section className="postIcons">
        <div className="postIcons__iconContainer">
					<button onClick={()=>{setLikeClick(!likeClick)}}>
            <Like click={likeClick} />
          </button>
          
        </div>

        <div className="postIcons__iconContainer">
          <button name="viewComments" onClick={(e)=>{modalSwitchOpen(e)}} >
            <img
            className="postIcons__Icon"
						src={commentIcon}
						alt="Comment Icon"/>
          </button>
        </div>

        <div className="postIcons__iconContainer">
          <button>
            <img
            className="postIcons__Icon"
						src={send}
						alt="Send Icon"
						/>
          </button>
        </div>

        <div className="postIcons__iconContainer">
          <button onClick={()=>{setSaveClick(!saveClick)}}>
            <SaveIcon click={saveClick}/>
          </button>
        </div>
    </section>
  )
}

export default PostIcons