import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GiSoundOn, GiSoundOff } from 'react-icons/gi';
import { OriginalLanguage } from '../models/originalLanguage';
import { Word } from '../models/word';
import './card.css';
import { useSpeechSynthesis } from 'react-speech-kit';

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
  const [isSoundOn, setIsSoundOn] = useState(false);

  const { speak, voices } = useSpeechSynthesis();
  const spanishVoice = voices[4];//.find((v: any) => v.name==='Google español');
  
  const originalWord = translateFromEnglish ? currentWord.english : currentWord.spanish;
  const translationWord = translateFromEnglish ? currentWord.spanish : currentWord.english;

  const originalLanguage = translateFromEnglish ? 'English' : 'Spanish';
  const translationLanguage = translateFromEnglish ? 'Spanish' : 'English';


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

  const getRandomWord = () => {
    const randomIndex = getRandomInt(wordsList.length);
    return wordsList[randomIndex];
  }

  const getRandomOriginalLanguage = () => {
    const randomBinaryNumber = getRandomInt(2);
    return randomBinaryNumber === 1;
  }

  const changeToNextWord = () => {
    let isNextWordSpanish = fromLanguage === OriginalLanguage.SPANISH;
    if (fromLanguage === OriginalLanguage.RANDOM) {
      console.log('changins')
      const isEnglish = getRandomOriginalLanguage();
      isNextWordSpanish = !isEnglish;
      setTranslateFromEnglish(isEnglish);
    }

    const randomWord = getRandomWord();
    setCurrentWord(randomWord);
    setIsTranslationHidden(true);

    if (isNextWordSpanish && isSoundOn) {
      speak({ text: randomWord.spanish , voice: spanishVoice})
    }
  }

  const revealTranslation = () => {
    setIsTranslationHidden(false);
    if (translateFromEnglish && isSoundOn) {
      speak({ text: translationWord , voice: spanishVoice})
    }
  }

  return (
    <div className='card'>
        <div style={{display: 'flex'}}>
          <div className='audioBtn' onClick={() => {setIsSoundOn(!isSoundOn)}}>
            {isSoundOn ? <GiSoundOn size={25}/> : <GiSoundOff size={25}/>}
          </div>
          <p className='fromToTxt' style={{fontSize: 10, visibility: fromLanguage === OriginalLanguage.RANDOM ? 'visible': 'hidden'}}>
            {originalLanguage} {'->'} {translationLanguage}
          </p>
        </div>
        <p className='originalWord'>{originalWord}</p>
        {!isTranslationHidden && <p className='translationWord'>{translationWord}</p>}
        {isTranslationHidden && <p className='revealButton' onClick={revealTranslation}>reveal</p>}
        <AiOutlineArrowLeft style={{cursor: 'pointer'}} size={20} onClick={changeToNextWord} />
    </div>
  );
}

export default Card;
