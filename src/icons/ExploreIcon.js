import React from 'react'

export default function ExploreIcon({buttonState}) {
  return buttonState.isActive? (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        aria-label="Explore" 
        color="#262626" 
        fill="#262626" 
        height="24" 
        width="24">
            <path 
                d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z"
            />
        </svg>
  ): (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        aria-label="Find people" 
        color="#262626" 
        fill="#262626" 
        height="24" 
        width="24">
            <path 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="m13.941 13.953-6.36 2.471 2.479-6.368 6.36-2.471-2.479 6.368z"
            />
            <path 
                fillRule="evenodd" 
                d="m10.06 10.056 3.889 3.889-6.368 2.479 2.479-6.368z"
            />
            <circle 
                cx="12.001" 
                cy="12.005" 
                fill="none" 
                r="10.5" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
            />
    </svg>
  )
}
