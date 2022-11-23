import React from 'react'

function SaveIcon({color, matches}) {

   
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-label="Save" 
            color={color} 
            fill="#262626" 
            height={matches ? "12" : "24"} 
            width={matches ? "12" : "24"} 
            >
                <path 
                    fill="none" 
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