import React, {useState, useRef, useEffect} from 'react'
import Slider from "react-slick";
import './ReelCarouselTwo.css'
import './Reel.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Avatar } from '@mui/material';







function ReelCarouselTwo({list}) {

	const list2 = 
	[
		{username: 'tester3', id: '1BUG2QxgPKBKMojpBHle'},
		{username: 'Tester2', id: 'GSG1WREBR34mJNv9RqDi'},
		{username: 'Tester', id: 'aHTiFthtrFi7Q5wpwzNg'},
		{username: 'tester3', id: '1BUG2QxgPKBKMojpBHle'},
		{username: 'Tester2', id: 'GSG1WREBR34mJNv9RqDi'},
		{username: 'tester3', id: '1BUG2QxgPKBKMojpBHle'},
		{username: 'Tester2', id: 'GSG1WREBR34mJNv9RqDi'},
		{username: 'tester3', id: '1BUG2QxgPKBKMojpBHle'},
		{username: 'Tester2', id: 'GSG1WREBR34mJNv9RqDi'},
		{username: 'tester3', id: '1BUG2QxgPKBKMojpBHle'},
		{username: 'Tester2', id: 'GSG1WREBR34mJNv9RqDi'},
	];


	const settings = {
		infinite: false,
		speed: 500,
		slidesToShow: 5,
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
        
		return  list2.map(({username, id}) =>{
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
					<div className="reelName">
						<div className="app__reelsNameContainer">
							<div className="app__reelsName">{username}</div>
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

export default ReelCarouselTwo