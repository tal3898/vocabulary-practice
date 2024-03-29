import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import { LearningOption } from "../models/learningOption";
import { OriginalLanguage } from "../models/originalLanguage";
import { Word } from "../models/word";
import {
  isRevealEnabledSelected,
  isTimerModeEnabledSelector,
  setTimerModeIntervalId,
} from "../stateManagement/settings";
import { getRandomInt, getShuffledList } from "../utils/randomFuncs";
import "./card.css";
import { CardActionsButtons } from "./cardsActionsButtons/cardActionsButtons";

interface Props {
  wordsList: Word[];
  fromLanguage: OriginalLanguage;
  selectedLearningOption: LearningOption;
}

function Card({ selectedLearningOption, fromLanguage, wordsList }: Props) {
  const [isTranslationHidden, setIsTranslationHidden] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [translateFromEnglish, setTranslateFromEnglish] = useState(
    fromLanguage === OriginalLanguage.ENGLISH
  );
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [shuffledWords, setShuffledWords] = useState(wordsList);
  const [exampleSentence, setExampleSentence] = useState<string | undefined>(
    undefined
  );

  const isRevealEnabled = useSelector(isRevealEnabledSelected);
  const isTimerModeEnabled = useSelector(isTimerModeEnabledSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("rere");
    if (isTimerModeEnabled) {
      const interval = setInterval(() => {
        console.log("asdf");
        changeToNextWord();
      }, 2 * 1000);

      dispatch(setTimerModeIntervalId(interval));
    }

    // return () => clearInterval(interval);
  }, [isTimerModeEnabled]);

  useEffect(() => {
    const reshuffledWords = getShuffledList(wordsList);
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
    let nextWord = shuffledWords[nextWordIndex];
    if (nextWordIndex === 0) {
      const reshuffledList = getShuffledList(wordsList);
      setShuffledWords(reshuffledList);
      nextWord = reshuffledList[0];
    }
    setCurrentWordIndex(
      (currentWordIndex) => (currentWordIndex + 1) % wordsList.length
    );
    setIsTranslationHidden(true);
    setExampleSentence(undefined);

    if (
      isSoundOn &&
      (isNextWordSpanish || selectedLearningOption === LearningOption.NEW)
    ) {
      speak({
        text: nextWord.spanish,
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

  return (
    <div className="card">
      {/* <div style={{ display: "flex" }}>
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
      </div> */}
      <div className="wordDesc">
        <p className="originalWord">{originalWord}</p>
        {(!isTranslationHidden ||
          selectedLearningOption === LearningOption.NEW ||
          !isRevealEnabled) && (
          <div className="translationBox">
            <div className="translationWord">{translationWord}</div>
            {/* <ExampleSentence
            spanishWord={shuffledWords[currentWordIndex].spanish}
            exampleSentence={exampleSentence}
            setExampleSentence={setExampleSentence}
          /> */}
          </div>
        )}
        {isTranslationHidden &&
          selectedLearningOption !== LearningOption.NEW &&
          isRevealEnabled && (
            <div className="revealButton" onClick={revealTranslation}>
              reveal
            </div>
          )}
      </div>
      <div className="cardActions">
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <CardActionsButtons word={shuffledWords[currentWordIndex]} />
        </div>
      </div>

      {!isTimerModeEnabled && (
        <div className="skipWordActions">
          <AiOutlineArrowLeft
            style={{ cursor: "pointer" }}
            size={28}
            onClick={changeToNextWord}
          />
        </div>
      )}
    </div>
  );
}

export default Card;
