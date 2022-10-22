import React from 'react'
import './CheckPostModal.css'

function CheckPostModal({switchModalFunc}) {

  return (
    <div className="checkPostModal__container">
        <div onClick={()=> switchModalFunc()} className="checkPostModal__darkBg">
        </div>
    </div>
  )
}

export default CheckPostModal