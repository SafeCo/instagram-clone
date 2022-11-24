import React from 'react'
import Slider from "react-slick";
import './ReelCarousel.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Avatar } from '@mui/material';
import rightChevron from '../../../icons/rightChevron.svg'
import leftChevron from '../../../icons/leftChevron.svg'
import { useOutletContext } from 'react-router-dom'

function ReelCarousel() {

	const {reelAndSug} = useOutletContext()

	const settings = {
		centerPadding: 0,
		infinite: false,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
	};



	function SampleNextArrow(props) {
        const { className,  onClick } = props;
		
        return (
		<div
            className={className}
            style={{}}
            onClick={onClick}
          >
			<img className="slickArrowImage" alt="rightChevron" src={rightChevron}/>
		  </div>
         
        );
      }

      function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
		<div
            className={className}
            style={{}}
            onClick={onClick}
			>
			<img className="slickArrowImage" alt="leftChevron"  src={leftChevron}/>
		  </div>
        );
      }

	  function generateReels() {
        
		return  reelAndSug.map(({username, id, photoUrl}) =>{
		  return <div key={id} className="reel__container">
					<div className="reel__profile">
						<div className="reel__image">
							<Avatar
							className="reel__avatar"
							sx={{ width: 55, height: 55 }}
							alt= {username}
							src={photoUrl}
							/>
		
							<div className="reel__avatarRing"></div>         
		
							</div>
							<div className="reelName">
								<div className="app__reelsNameContainer">
									<div className="app__reelsName">{username}</div>
								</div>
							</div>
						</div> 
					</div>
					
		  }) 
	}
	
   const reels = generateReels() 



  return (
			<div className="test">
				<Slider {...settings}>
					{reels}
				</Slider>
			</div>
			
			
  )
}

export default ReelCarousel