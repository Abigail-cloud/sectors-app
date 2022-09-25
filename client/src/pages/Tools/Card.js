import React from 'react'

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
   <button className='btn btn-hero'>
            Check It Out
          </button>
  </main>
 );
};

export default Book