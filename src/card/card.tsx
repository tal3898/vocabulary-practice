import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { FaDice } from "react-icons/fa";
import { useSpeechSynthesis } from "react-speech-kit";
import { LearningOption } from "../models/learningOption";
import { OriginalLanguage } from "../models/originalLanguage";
import { Word } from "../models/word";
import "./card.css";
import { CardActionsButtons } from "./cardsActionsButtons/cardActionsButtons";
import wiki from "wikipedia";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  wordsList: Word[];
  fromLanguage: OriginalLanguage;
  selectedLearningOption: LearningOption;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getShuffledList = (list: any[]) => {
  return [...list].sort(() => Math.random() - 0.5);
};

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
  const [isLoadingSentence, setIsLoadingSentence] = useState(false);

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

  const getRandomSentence = async (spanishWord: string) => {
    const searchFor = " " + spanishWord.toLowerCase() + " ";
    await wiki.setLang("es");
    let page = await wiki.page("Anexo:Redes LTE");
    let content = await page.content();
    let links = await page.links();

    while (!content.toLowerCase().includes(searchFor)) {
      const randomLinkIndex = getRandomInt(links.length);
      const randomLink = links[randomLinkIndex];

      try {
        page = await wiki.page(randomLink);
        content = await page.content();
        links = await page.links();

        console.log({
          page,
          content,
        });
      } catch (e) {
        console.log("error occured while searching for a sentence");
      }
    }

    const exampleIndex = content.toLowerCase().indexOf(searchFor);
    const endOfSentencePeriod = content
      .toLowerCase()
      .indexOf(".", exampleIndex);
    const endOfSentenceComma = content.toLowerCase().indexOf(",", exampleIndex);
    const endOfSentence = Math.min(endOfSentenceComma, endOfSentencePeriod);

    const firstIndexOfPeriod = content
      .toLowerCase()
      .substring(0, exampleIndex)
      .lastIndexOf(".");
    const firstIndexOfComma = content
      .toLowerCase()
      .substring(0, exampleIndex)
      .lastIndexOf(",");
    const firstIndex = Math.max(firstIndexOfPeriod, firstIndexOfComma);
    const randomSentence = content.substring(firstIndex + 1, endOfSentence);
    console.log({ randomSentence });
    return randomSentence;
  };

  const loadRandomSentence = async () => {
    setIsLoadingSentence(true);
    const randomSentence = await getRandomSentence(
      shuffledWords[currentWordIndex].spanish
    );
    console.log({
      word: shuffledWords[currentWordIndex].spanish,
      sentence: randomSentence,
    });
    setExampleSentence(randomSentence);
    setIsLoadingSentence(false);
  };

  const changeToNextWord = async () => {
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
    setCurrentWordIndex(nextWordIndex);
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
        <div className="translationBox">
          <div className="translationWord">{translationWord}</div>
          <div>
            {!isLoadingSentence && (
              <div className="exampleSentence" onClick={loadRandomSentence}>
                <div className="exampleSentenceRandomBtn">
                  <FaDice />
                </div>
                {exampleSentence ?? "Click to get example sentence"}
              </div>
            )}
            {isLoadingSentence && (
              <div className="exampleSentenceLoader">
                <ClipLoader size={11} color="#36d7b7" />
              </div>
            )}
          </div>
        </div>
      )}
      {isTranslationHidden && selectedLearningOption !== LearningOption.NEW && (
        <p className="revealButton" onClick={revealTranslation}>
          reveal
        </p>
      )}
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <CardActionsButtons word={shuffledWords[currentWordIndex]} />
        </div>
      </div>
      <div className="cardActions">
        <AiOutlineArrowLeft
          style={{ cursor: "pointer" }}
          size={28}
          onClick={changeToNextWord}
        />
      </div>
    </div>
  );
}

export default Card;
