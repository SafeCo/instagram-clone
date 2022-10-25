import React, {useState, useRef, useEffect} from 'react'
import './ReelCarousel.css'
import Reel from './Reel'


function ReelCarousel({list}) {

  const scrollElement = useRef()
  const [index, setIndex] = useState(1)
  const [scrollNum, setScrollNum] = useState(0)

  const slideLeft = () => {
    if (index - 1 >= 1) {
      setIndex(index - 1);
      updateScrollLeft()
    }
  }

  const slideRight = () => {
    if (index + 1 <= 2) {
      setIndex(index + 1);
      updateScrollRight()
    }
  
  };

  const updateScrollRight = ()=>{
    setScrollNum(scrollNum - 85)
  }

  const updateScrollLeft = ()=>{
    setScrollNum(scrollNum + 85)
  }

  useEffect(()=>{
    scrollElement.current.style.transform = "translateX(" + scrollNum +"%)"
  }, [scrollNum])



  return (
    <div className="RC__container">
      <div ref={scrollElement} className=" RC__scroll ">
        <Reel list={list} />
      </div>
        <div className='RC__buttons'>
          <div className="RC__lButton">
            <button className="RC__button" onClick={slideLeft}>
              <p>‹</p>
            </button>
          </div>
          <div className="RC__RButton">
            <button className="RC__button"  onClick={slideRight}>
            <p>›</p>
            </button>
          </div>
        </div>
    </div>
    
  )
}

export default ReelCarousel