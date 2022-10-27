import React, {useState, useRef, useEffect} from 'react'
import Reel from './Reel'
import Slider from "react-slick";
import './ReelCarouselTwo.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Avatar } from '@mui/material';



function ReelCarousel({list}) {
	const settings = {
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
	};


	function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
          />
        );
      }

      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }

	  function generateReels() {
        
		return  list.map(({username, id}) =>{
		  return <div key={id} className="reel__profile">
					<div className="reel__image">
					  <Avatar
					  className="reel__avatar"
					  sx={{ width: 55, height: 55 }}
					  alt= {username}
					  src="/static/images/avatar/1.jpg"
					  />
  
					  <div className="reel__avatarRing"></div>         
  
					</div>
					<div className="app__reelsNameContainer">
						<div className="app__reelsName">{username}</div>
					  </div>
				  </div> 
		  }) 
	}
	
   const reels= generateReels() 



  return (
			<div className="RC2__container">
				<Slider {...settings}>
					{reels}
				</Slider>
			</div>
			
			
  )
}

export default ReelCarousel