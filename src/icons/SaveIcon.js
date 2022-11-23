import React from 'react'

function SaveIcon({click}) {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    color="#262626" 
    fill="#262626" 
    height="24" 
    width="24"
    >
        <path 
        fill={ click? "#262626" : "none" }
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="m20 21-8-7.56L4 21V3h16v18z"
        />
    </svg>
  )
}

export default SaveIcon