import React from 'react'
import { Link } from 'react-router-dom';
const Book = ({ img, title, desc }) => {
 
 
  return (
   
  <main
   className='book'
   onMouseOver={() => {
    console.log(title);
   }}
  >
   <img src={img} alt='' className='card' />
   <h1 >{title}</h1>
   <h4>{desc}</h4>
   <Link to='/register' className='btn btn-hero'>
            Check it out
          </Link>
  </main>
 );
};

export default Book