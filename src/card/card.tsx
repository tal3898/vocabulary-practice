import { useEffect, useState } from "react";
import { AiFillPlusCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { useSpeechSynthesis } from "react-speech-kit";
import { LearningOption } from "../models/learningOption";
import { OriginalLanguage } from "../models/originalLanguage";
import { Word } from "../models/word";
import {
  getPracticeWords,
  savePracticeWords,
} from "../utils/practiceLocalStorage";
import "./card.css";

interface Props {
  wordsList: Word[];
  fromLanguage: OriginalLanguage;
  selectedLearningOption: LearningOption;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Card({ selectedLearningOption, fromLanguage, wordsList }: Props) {
  const [isTranslationHidden, setIsTranslationHidden] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [translateFromEnglish, setTranslateFromEnglish] = useState(
    fromLanguage === OriginalLanguage.ENGLISH
  );
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isWordSaved, setIsWordSaved] = useState(false);
  const [shuffledWords, setShuffledWords] = useState(wordsList);

  useEffect(() => {
    const reshuffledWords = [...wordsList].sort(() => Math.random() - 0.5);
    setShuffledWords(reshuffledWords);
    setCurrentWordIndex(0);
  }, [wordsList]);

  const { speak, voices } = useSpeechSynthesis();
  const spanishVoice = voices.find((v: any) => v.lang === "es-ES");

  const originalWord = translateFromEnglish
    ? shuffledWords[currentWordIndex].english
    : shuffledWords[currentWordIndex].spanish;
  const translationWord = translateFromEnglish
    ? shuffledWords[currentWordIndex].spanish
    : shuffledWords[currentWordIndex].english;

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

    const nextWordIndex = (currentWordIndex + 1) % wordsList.length;
    setCurrentWordIndex(nextWordIndex);
    setIsTranslationHidden(true);
    setIsWordSaved(false);

    if (isNextWordSpanish && isSoundOn) {
      speak({
        text: shuffledWords[nextWordIndex].spanish,
        voice: spanishVoice,
      });
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
    practiceWords.push(currentWordIndex);
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
