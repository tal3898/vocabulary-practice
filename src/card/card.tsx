import React, { useState } from 'react';
import './card.css';
import {Word} from '../models/word'

interface Props {
    word: Word;
}

function Card({word}: Props) {
  const [isTranslationHidden, setIsTranslationHidden] = useState(true);

  return (
    <div className='card'>
        <p className='originalWord'>{word.english}</p>
        {!isTranslationHidden && <p className='translationWord'>{word.spanish}</p>}
        {isTranslationHidden && <p className='revealButton' onClick={() => setIsTranslationHidden(false)}>reveal</p>}
        
    </div>
  );
}

export default Card;
