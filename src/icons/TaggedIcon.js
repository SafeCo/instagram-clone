import React from 'react'

function TaggedIcon({color, height, width}) {
    return (
        <svg 
            viewBox="0 0 22 22.006" 
            xmlns="http://www.w3.org/2000/svg" 
            color={color}
            fill="#262626" 
            height={height}
            width={width}
        >
            <path 
                d="M9.201 2.8 11 1l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 21 5.083v14.104a1.818 1.818 0 0 1-1.818 1.818H2.818A1.818 1.818 0 0 1 1 19.187V5.083a1.818 1.818 0 0 1 1.818-1.818h5.26A1.59 1.59 0 0 0 9.201 2.8z" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
            />
            <path 
                d="M17.598 21.005v-.602a3.949 3.949 0 0 0-3.948-3.949H8.495a3.949 3.949 0 0 0-3.949 3.949v.603" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
            />
            <circle 
                cx="11.072" 
                cy="10.078" 
                fill="none" 
                r="3.556" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
            />
        </svg>
    )
}

TaggedIcon.defaultProps = {
    height: "11.003",
    width: "11"
}

export default TaggedIcon