import React from 'react'
import './Hero.css'
import heart_icon from '../Asset/heart_icon.png'
import arrow_icon from '../Asset/arrow.png'
import hero_image from '../Asset/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
     <div className="hero-left">
      <h2>#EATBETTER #FEELBETTER #LIVEBETTER</h2>
      <div>
        <div className="hand-hand-icon">
          <p>100%</p>
          <img src={heart_icon} alt="" />
        </div>
       <p>Natural</p> 
       <p>Organic Products</p>
       <p>With Best Quality</p>
      </div>
      <div className="hero-latest-btn"></div>
      
      <img src={arrow_icon} alt="" />
      </div>   
      <div className="hero-right">
        <img src={hero_image} alt="" />

      </div>
    </div>
  )
}

export default Hero