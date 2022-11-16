import React from 'react'
import './ResFollowInfo.css'

function ResFollowInfo() {
    return (
        <>
            <ul className="resFollowInfo__container" >
                <li className="resFollowInfo__posts spread" >
                    <div className="resFollowInfo__text">
                        <span className="resFollowInfo__num" >!! </span>
                        <p>posts</p>
                    </div>
                </li>
                <li className="resFollowInfo__followers spread" >
                    <div className="resFollowInfo__text">
                        <span className="resFollowInfo__num" >!! </span>
                        <p>followers</p>
                    </div>
                </li>
                <li className="resFollowInfo__following spread" >
                    <div className="resFollowInfo__text">
                        <span className="resFollowInfo__num" >!! </span>
                        <p>following</p>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default ResFollowInfo