import React from 'react';
import main from '../assets/images/main.svg';
// import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo}  from '../components'
import Slider from './slider/App';
import Row from './Tools/App';
import { Link } from 'react-router-dom'



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
          Before the recent COVID-19 pandemic, jobs were being created by the millions, and wage growth was on the rise. What industries propelled America’s self-contained economy?

The five sectors that are have helped fuel the economy’s growth in the wake of the latest economic downturn. The selection is based on data from the Bureau of Labor Statistics (BLS) and industry perspectives.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='Sector search' className='img main-img' />
      </div>
      <Slider />
      <Row /> 
    </Wrapper>
  )
}




export default landing
