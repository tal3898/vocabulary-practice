import React, { useState } from 'react';
import './card.css';
import {Word} from '../models/word'
import {AiOutlineArrowLeft} from 'react-icons/ai'

interface Props {
    wordsList: Word[];
}

const defaultWord: Word = {english: '...', spanish: '...'};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Card({wordsList}: Props) {
  const [isTranslationHidden, setIsTranslationHidden] = useState(true);
  const [currentWord, setCurrentWord] = useState(wordsList[0] ?? defaultWord);

  const changeWordRandomly = () => {
    const randomIndex = getRandomInt(wordsList.length);
    setCurrentWord(wordsList[randomIndex]);
  }

  return (
    <div className='card'>
        <p className='originalWord'>{currentWord.english}</p>
        {!isTranslationHidden && <p className='translationWord'>{currentWord.spanish}</p>}
        {isTranslationHidden && <p className='revealButton' onClick={() => setIsTranslationHidden(false)}>reveal</p>}
        <AiOutlineArrowLeft style={{cursor: 'pointer'}} size={20} onClick={changeWordRandomly} />
    </div>
  );
}

export default Card;
