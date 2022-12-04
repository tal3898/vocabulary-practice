import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { OriginalLanguage } from '../models/originalLanguage';
import { Word } from '../models/word';
import './card.css';

interface Props {
    wordsList: Word[];
    fromLanguage: OriginalLanguage;
}

const defaultWord: Word = {english: '...', spanish: '...'};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Card({fromLanguage, wordsList}: Props) {
  const [isTranslationHidden, setIsTranslationHidden] = useState(true);
  const [currentWord, setCurrentWord] = useState(wordsList[0] ?? defaultWord);
  const [translateFromEnglish, setTranslateFromEnglish] = useState(fromLanguage === OriginalLanguage.ENGLISH);

  useEffect(() => {
      console.log('d')
      if (fromLanguage === OriginalLanguage.ENGLISH) {
        setTranslateFromEnglish(true);
      } else if (fromLanguage === OriginalLanguage.SPANISH) {
        setTranslateFromEnglish(false);
      } else {
        const randomBinaryNumber = getRandomInt(2);
        setTranslateFromEnglish(randomBinaryNumber === 1);
      }
    }, [fromLanguage])

  const changeWordRandomly = () => {
    const randomIndex = getRandomInt(wordsList.length);
    setCurrentWord(wordsList[randomIndex]);
  }

  const changeOriginalLanguageRandomly = () => {
    const randomBinaryNumber = getRandomInt(2);
    setTranslateFromEnglish(randomBinaryNumber === 1);
  }

  const changeToNextWord = () => {
    if (fromLanguage === OriginalLanguage.RANDOM) {
      console.log('changins')
      changeOriginalLanguageRandomly();
    }
    changeWordRandomly();
    setIsTranslationHidden(true);
  }
  
  const originalWord = translateFromEnglish ? currentWord.english : currentWord.spanish;
  const translationWord = translateFromEnglish ? currentWord.spanish : currentWord.english;

  const originalLanguage = translateFromEnglish ? 'English' : 'Spanish';
  const translationLanguage = translateFromEnglish ? 'Spanish' : 'English';

  return (
    <div className='card'>
        <p style={{fontSize: 10, visibility: fromLanguage === OriginalLanguage.RANDOM ? 'visible': 'hidden'}}>
          {originalLanguage} {'->'} {translationLanguage}
        </p>
        <p className='originalWord'>{originalWord}</p>
        {!isTranslationHidden && <p className='translationWord'>{translationWord}</p>}
        {isTranslationHidden && <p className='revealButton' onClick={() => setIsTranslationHidden(false)}>reveal</p>}
        <AiOutlineArrowLeft style={{cursor: 'pointer'}} size={20} onClick={changeToNextWord} />
    </div>
  );
}

export default Card;
