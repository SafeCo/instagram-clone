import React from 'react'
import './LazyPost.css'
import { Avatar } from '@mui/material'

function LazyPost() {
    return (
        <div className="lazyPost">
            <div className="lazyPost__header" >
                <div className="lazyPost__headerProfile">
                    <div className="lazyPost__avatar"></div>
                    <div className="lazyPost__username"></div>
                </div>
            </div>
            <div className="lazyPost__image"></div>
        </div>
    )
}

export default LazyPost