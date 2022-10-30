import React from 'react'


export default function HomeIcon({buttonState}) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
        aria-label="Home" 
        color="#262626" 
        fill="#262626" 
        height="24" 
        width="24">
            <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" 
            fill= {buttonState.isActive ? "#262626" : "none"}
            stroke="currentColor" 
            strokeLinejoin="round" 
            strokeWidth="2"/>
        </svg>
  )
}
