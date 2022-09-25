import React from 'react';


// CSS
import './card.css';

import { data } from './data';
import SpecificBook from './Card';
import TypeWriterEffect from 'react-typewriter-effect';


function BookList() {
  return (
    <section className='booklist'>
          <TypeWriterEffect
        textStyle={{
          fontFamily: 'Red Hat Display',
          color: '#3F3D56',
          fontWeight: 500,
          fontSize: '1.5em',
        marginTop: '8rem',
        }}
        startDelay={2000}
        cursorColor="#3F3D56"
        multiText={[
          'Hey there, These are the apps that allows to know more about your Sector',
          'S E C T O R (S)',
          'These are :',

          'Book App to Download Books For Each Sectors',
          'Quiz App to test for reasoning in specific sector',
          
        ]}
        multiTextDelay={1000}
        typeSpeed={40}
      />
      {data.map((book, index) => {
        return <SpecificBook key={book.id} {...book}></SpecificBook>;
      })}
    </section>
  );
}

export default BookList
