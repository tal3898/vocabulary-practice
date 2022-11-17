import React from 'react';
import './card.css';
import {Word} from '../models/word'

interface Props {
    word: Word;
}

function Card({word}: Props) {
  return (
    <div className='card'>
        <p style={{color: 'black'}}>{word.english}</p>
        <p>{word.spanish}</p>
    </div>
  );
}

export default Card;
