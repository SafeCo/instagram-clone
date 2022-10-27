import React from 'react'
import Slider from "react-slick";
import './SimpleSlider.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Avatar } from '@mui/material';
import { flexbox } from '@mui/system';
import Reel from './Reel'

function SimpleSlider({list}) {
    const settings = {
        dots:true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
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
     console.log(reels)
    return (
        <div className="container">

        <Slider {...settings}>
            {reels}

        {/* <div>
            <p>Hello1</p>
        </div>
        <div>
            <p>Hello2</p>
        </div>
        <div>
            <p>Hello3</p>
        </div>
        <div>
            <p>Hello4</p>
        </div>
        <div>
            <p>Hello5</p>
        </div>
        <div>
            <p>Hello6</p>
        </div> */}

        </Slider>

        </div>
    )
}

export default SimpleSlider