import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiFillPlusCircle } from "react-icons/ai";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { OriginalLanguage } from "../models/originalLanguage";
import { Word } from "../models/word";
import "./card.css";
import { useSpeechSynthesis } from "react-speech-kit";
import translate from "translate";
import randomWords from "random-words";
import { LearningOption } from "../models/learningOption";
import {
  getPracticeWords,
  savePracticeWords,
} from "../utils/practiceLocalStorage";

interface Props {
  wordsList: Word[];
  fromLanguage: OriginalLanguage;
  selectedLearningOption: LearningOption;
}

const defaultWord: Word = { english: "...", spanish: "..." };

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Card({ selectedLearningOption, fromLanguage, wordsList }: Props) {
  const [isTranslationHidden, setIsTranslationHidden] = useState(true);
  const [currentWord, setCurrentWord] = useState(wordsList[0] ?? defaultWord);
  const [translateFromEnglish, setTranslateFromEnglish] = useState(
    fromLanguage === OriginalLanguage.ENGLISH
  );
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isWordSaved, setIsWordSaved] = useState(false);

  useEffect(() => {
    setCurrentWord(wordsList[0]);
  }, [wordsList]);

  const { speak, voices } = useSpeechSynthesis();
  const spanishVoice = voices.find((v: any) => v.lang === "es-ES");

  const originalWord = translateFromEnglish
    ? currentWord.english
    : currentWord.spanish;
  const translationWord = translateFromEnglish
    ? currentWord.spanish
    : currentWord.english;

  const originalLanguage = translateFromEnglish ? "English" : "Spanish";
  const translationLanguage = translateFromEnglish ? "Spanish" : "English";

  useEffect(() => {
    if (fromLanguage === OriginalLanguage.ENGLISH) {
      setTranslateFromEnglish(true);
    } else if (fromLanguage === OriginalLanguage.SPANISH) {
      setTranslateFromEnglish(false);
    } else {
      const randomBinaryNumber = getRandomInt(2);
      setTranslateFromEnglish(randomBinaryNumber === 1);
    }
  }, [fromLanguage]);

  const getRandomWord = () => {
    const randomIndex = getRandomInt(wordsList.length);
    return wordsList[randomIndex];
  };

  const getRandomOriginalLanguage = () => {
    const randomBinaryNumber = getRandomInt(2);
    return randomBinaryNumber === 1;
  };

  const changeToNextWord = () => {
    let isNextWordSpanish = fromLanguage === OriginalLanguage.SPANISH;
    if (fromLanguage === OriginalLanguage.RANDOM) {
      const isEnglish = getRandomOriginalLanguage();
      isNextWordSpanish = !isEnglish;
      setTranslateFromEnglish(isEnglish);
    }

    const randomWord = getRandomWord();
    setCurrentWord(randomWord);
    setIsTranslationHidden(true);
    setIsWordSaved(false);

    if (isNextWordSpanish && isSoundOn) {
      speak({ text: randomWord.spanish, voice: spanishVoice });
    }
  };

  const revealTranslation = () => {
    setIsTranslationHidden(false);

    if (translateFromEnglish && isSoundOn) {
      speak({ text: translationWord, voice: spanishVoice });
    }
  };

  const addNewWordToPractice = () => {
    const practiceWords = getPracticeWords();
    practiceWords.push(currentWord);
    savePracticeWords(practiceWords);
    setIsWordSaved(true);
  };

  return (
    <div className="card">
      <div style={{ display: "flex" }}>
        <div
          className="audioBtn"
          onClick={() => {
            setIsSoundOn(!isSoundOn);
          }}
        >
          {isSoundOn ? <GiSoundOn size={25} /> : <GiSoundOff size={25} />}
        </div>
        <p
          className="fromToTxt"
          style={{
            fontSize: 10,
            visibility:
              fromLanguage === OriginalLanguage.RANDOM ? "visible" : "hidden",
          }}
        >
          {originalLanguage} {"->"} {translationLanguage}
        </p>
      </div>
      <p className="originalWord">{originalWord}</p>
      {(!isTranslationHidden ||
        selectedLearningOption === LearningOption.NEW) && (
        <p className="translationWord">{translationWord}</p>
      )}
      {isTranslationHidden && selectedLearningOption !== LearningOption.NEW && (
        <p className="revealButton" onClick={revealTranslation}>
          reveal
        </p>
      )}
      <div className="cardActions">
        <AiOutlineArrowLeft
          style={{ cursor: "pointer" }}
          size={28}
          onClick={changeToNextWord}
        />
        {selectedLearningOption !== LearningOption.PRACTICE && !isWordSaved && (
          <div className="addToPracticeAction" onClick={addNewWordToPractice}>
            <AiFillPlusCircle size={26} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
