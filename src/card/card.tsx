import React from 'react';
import './card.css';
import {Word} from '../models/word'

interface Props {
    word: Word;
}

function Card({word}: Props) {
  return (
    <div>
        <p>{word.english}</p>
        <p>{word.spanish}</p>
    </div>
  );
}

export default Card;
