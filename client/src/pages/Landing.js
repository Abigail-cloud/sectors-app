import React from 'react';
import main from '../assets/images/main.svg';
// import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo}  from '../components'
import Slider from './slider/App';
import Row from './Tools/App';



const landing = () => {
  return (
    <Wrapper>
    <nav>
      <Logo />
    </nav>
    <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            Sector <span>record</span> app
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <button className='btn btn-hero'>
            Login/Register
          </button>
        </div>
        <img src={main} alt='Sector search' className='img main-img' />
      </div>
      <Slider />
      <Row /> 
    </Wrapper>
  )
}




export default landing
