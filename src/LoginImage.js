import { animate } from 'framer-motion'
import React, {useState, useEffect, useRef} from 'react'
import instagramPhone from './instagram_Phone.svg'
import './LoginImage.css'
function LoginImage() {


  const one = useRef("first")
  const two = useRef("second")
  const three = useRef("third")
  const four = useRef("fourth")

  const [animation, setAnimation] = useState({
    one: "first",
    two: "second",
    three: "third",
    four: "fourth",
  })
  

  useEffect(()=>{
  
  const animTimer = setInterval(()=>{

    const newObj = function(obj){
        Object.keys(obj).forEach(function(key){ 
          if(obj[key] === "first"){
            obj[key] = "fourth" 
          }else if(obj[key] === "second"){
            obj[key] = "first"
          }else if(obj[key] === "third"){
            obj[key] = "second"
          }else if(obj[key] === "fourth"){
            obj[key] = "third"
          }
          });
        return obj;
      } 
    one.current.classList.remove(animation.one) 
    two.current.classList.remove(animation.two) 
    three.current.classList.remove(animation.three) 
    four.current.classList.remove(animation.four) 

    setAnimation(newObj(animation))

    one.current.classList.add(animation.one) 
    two.current.classList.add(animation.two) 
    three.current.classList.add(animation.three) 
    four.current.classList.add(animation.four) 
    console.log(one.current.classList)
  },5000)
  return()=>{
    clearInterval(animTimer);
  }
},[animation])



  return (
    <div>
      <div className='loginImage__box'>
        <img src={instagramPhone} />
        <div className='loginImage_imageParent'>
          <img className={"loginImage__images fourth"} ref={four}
          src={"https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"}/>
          
          <img className={"loginImage__images third"} ref={three}
          src={"https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png"}/>
          
          <img className={"loginImage__images second"} ref={two}
          src={"https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"}/>
          
          <img className={"loginImage__images first"} ref={one}
          src={"https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png"}/>
        </div>
          
      </div>
    </div>
  )
}

export default LoginImage