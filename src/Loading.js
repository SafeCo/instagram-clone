import React, {useEffect, useRef} from 'react'
import './Loading.css'
import {motion} from 'framer-motion'

function Loading() {

    const container = useRef()


    
  return (
    <div ref={container} className="loading__container">
      <div className="loading__loaderContainer" >

        <motion.div 
          initial={{width: "0"}}
          animate={{width:"100%"}}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="loading__loader" >
          
        </motion.div>

      </div>
    </div>
  )
}

export default Loading