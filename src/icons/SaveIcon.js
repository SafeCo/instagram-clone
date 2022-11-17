import React from 'react'

function SaveIcon({color, height, width}) {

   
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="1.3 1.2 21 21"
            aria-label="Save" 
            color={color} 
            fill="#262626" 
            height={height}
            width={width}
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

SaveIcon.defaultProps = {
    color: "#8e8e8e",
    height: "12",
    width: "12"
}

export default SaveIcon