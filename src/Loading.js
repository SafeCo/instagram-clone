import React, {useEffect, useRef} from 'react'
import './Loading.css'
import instaSuspenseLogo from './instagramSuspenseLogo.svg'

function Loading() {

    const container = useRef()


    
  return (
    <div ref={container} className="loading__container">
        <img
            className="loading__logo"
            src={instaSuspenseLogo}
        />
    </div>
  )
}

export default Loading