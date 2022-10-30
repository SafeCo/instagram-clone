import React from 'react'

export default function SendIcon({buttonState}) {
    
  return buttonState.isActive ? (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        aria-label="Direct"
        color="#262626" 
        fill="#262626" 
        height="24" 
        width="24">
            <path 
                d="M22.91 2.388a.69.69 0 0 0-.597-.347l-20.625.002a.687.687 0 0 0-.482 1.178L7.26 9.16a.686.686 0 0 0 .778.128l7.612-3.657a.723.723 0 0 1 .937.248.688.688 0 0 1-.225.932l-7.144 4.52a.69.69 0 0 0-.3.743l2.102 8.692a.687.687 0 0 0 .566.518.655.655 0 0 0 .103.008.686.686 0 0 0 .59-.337L22.903 3.08a.688.688 0 0 0 .007-.692" 
                fillRule="evenodd"
            />
    </svg>
  ):
  (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        aria-label="Direct" 
        color="#262626" 
        fill="#262626" 
        height="24" 
        width="24">
            <path 
                fill="none" 
                stroke="#262626" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M22 3 9.218 10.083M11.698 20.334 22 3.001H2l7.218 7.083 2.48 10.25z"
            />
    </svg>
  ) 
  
}
