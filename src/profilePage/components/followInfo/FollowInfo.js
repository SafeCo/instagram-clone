import React from 'react'
import './FollowInfo.css'

function FollowInfo() {
    return (
        <>
            <ul className="followInfo__container" >
                <li className="followInfo__posts" >
                    <div className="followInfo__text">
                        <span className="followInfo__num" >!! </span>
                        posts
                    </div>
                </li>
                <li className="followInfo__followers" >
                    <div className="followInfo__text">
                        <span className="followInfo__num" >!! </span>
                        followers
                    </div>
                </li>
                <li className="followInfo__following" >
                    <div className="followInfo__text">
                        <span className="followInfo__num" >!! </span>
                        following
                    </div>
                </li>
            </ul>
        </>
    )
}

export default FollowInfo