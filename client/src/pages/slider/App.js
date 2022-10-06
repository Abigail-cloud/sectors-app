import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import data from './data';
import './index.css';
function App() {
  const [card, setCard] = useState(data);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = card.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, card]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>About Sectors</span>
        </h2>
      </div>
      <div className="section-center">
        {card.map((card, cardIndex) => {
          const { id, image, name,  quote } = card;

          let position = 'nextSlide';
          if (cardIndex === index) {
            position = 'activeSlide';
          }
          if (
            cardIndex === index - 1 ||
            (index === 0 && cardIndex === card.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="card-img" />
              <h4>{name}</h4>
              <p className="text">{quote}</p>
              
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;