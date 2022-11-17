import React from 'react';
import './card.css';
import {Word} from '../models/word'

interface Props {
    word: Word;
}

function Card({word}: Props) {
  return (
    <div className='card'>
        <p className='originalWord'>{word.english}</p>
        <p className='translationWord'>{word.spanish}</p>
    </div>
  );
}

export default Card;
