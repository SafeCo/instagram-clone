import React from 'react'
import './ResFollowInfo.css'

function ResFollowInfo({ postNum }) {
    return (
        <>
            <ul className="resFollowInfo__container" >
                <li className="resFollowInfo__posts spread" >
                    <div className="resFollowInfo__info">
                        <span className="resFollowInfo__num" >{postNum ? postNum : "0"}</span>
                        <p>posts</p>
                    </div>
                </li>
                <li className="resFollowInfo__followers spread" >
                    <div className="resFollowInfo__info">
                        <span className="resFollowInfo__num" >0 </span>
                        <p>followers</p>

                    </div>
                </li>
                <li className="resFollowInfo__following spread" >
                    <div className="resFollowInfo__info">
                        <span className="resFollowInfo__num" >0 </span>
                        <p>following</p>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default ResFollowInfo