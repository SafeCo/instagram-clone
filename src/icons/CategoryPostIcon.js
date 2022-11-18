import React from 'react'

function CategoryPostIcon({color, matches}) {
    return (
        <svg 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg" 
            color={color} 
            fill="#262626" 
            height={matches ? "10" : "24"} 
            width={matches ? "10" : "24"} 
        >
                <path 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M1 1h18v18H1zM7.015 1v18M12.985 1v18M19 7.015H1M19 12.985H1"
                />
        </svg>
    )
}


export default CategoryPostIcon