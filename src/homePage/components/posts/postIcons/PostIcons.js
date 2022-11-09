import React from 'react'
import './PostIcons.css'
import commentIcon from '../../../../icons/comment.svg'
import heart from '../../../../icons/heart.svg'
import send from '../../../../icons/send.svg'
import save from '../../../../icons/save.svg'

function PostIcons() {
  return (
    <section className="postIcons">
        <div className="postIcons__iconContainer">
					<button>
            <img
            className="postIcons__Icon"
						src={heart}
						alt="Heart Icon"/>
          </button>
          
        </div>

        <div className="postIcons__iconContainer">
          <button>
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