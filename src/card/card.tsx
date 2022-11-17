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
  const [translateFromEnglish, setTranslateFromEnglish] = useState(false);

  const changeWordRandomly = () => {
    const randomIndex = getRandomInt(wordsList.length);
    setCurrentWord(wordsList[randomIndex]);
  }

  const changeOriginalLanguageRandomly = () => {
    const randomBinaryNumber = getRandomInt(2);
    console.log({randomBinaryNumber})
    setTranslateFromEnglish(randomBinaryNumber === 1);
  }

  const changeToNextWord = () => {
    changeWordRandomly();
    changeOriginalLanguageRandomly();
    setIsTranslationHidden(true);
  }
  
  console.log({translateFromEnglish});
  const originalWord = translateFromEnglish ? currentWord.english : currentWord.spanish;
  const translationWord = translateFromEnglish ? currentWord.spanish : currentWord.english;

  const originalLanguage = translateFromEnglish ? 'English' : 'Spanish';
  const translationLanguage = translateFromEnglish ? 'Spanish' : 'English';

  return (
    <div className='card'>
        <p>{originalLanguage} {'->'} {translationLanguage}</p>
        <p className='originalWord'>{originalWord}</p>
        {!isTranslationHidden && <p className='translationWord'>{translationWord}</p>}
        {isTranslationHidden && <p className='revealButton' onClick={() => setIsTranslationHidden(false)}>reveal</p>}
        <AiOutlineArrowLeft style={{cursor: 'pointer'}} size={20} onClick={changeToNextWord} />
    </div>
  );
}

export default Card;
