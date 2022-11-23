import React, {useState} from 'react'
import './PostIcons.css'

import commentIcon from '../../../../icons/comment.svg'
import heart from '../../../../icons/heart.svg'
import send from '../../../../icons/send.svg'
import save from '../../../../icons/save.svg'
import Like from '../../../../icons/Like';


function PostIcons({modalSwitchOpen}) {

  const [click, setClick] = useState(false)


  return (
    <section className="postIcons">
        <div className="postIcons__iconContainer">
					<button onClick={()=>{setClick(!click)}}>
            <Like click={click} />
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
          <button>
            <img
            className="postIcons__Icon"
						src={save}
						alt="Save Icon"

						/>
          </button>
        </div>
    </section>
  )
}

export default PostIcons