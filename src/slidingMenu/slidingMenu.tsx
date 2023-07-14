import React, { useState } from "react";
import Sidebar from "react-sidebar";
import "./slidingMenu.css";
import { useSelector } from "react-redux";
import { practiceListSelector } from "../stateManagement/practiceList";
import { getShuffledList } from "../utils/randomFuncs";
import { practiceAmountSelector } from "../stateManagement/settings";
import { Word } from "../models/word";
import { LearningOption } from "../models/learningOption";
import { learnedListSelector } from "../stateManagement/learnedList";
import randomWords from "random-words";
import translate from "translate";
import { GiPerspectiveDiceSixFacesRandom, GiStrongMan } from "react-icons/gi";
import { MenuOptionItem } from "./menuOptionItem/menuOptionItem";
import { BiCategoryAlt, BiMemoryCard } from "react-icons/bi";
import { BsChatDots, BsDice3 } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onChangeWordsList: (wordsList: Word[]) => void;
  selectedLearningOption: LearningOption;
  setSelectedLearningOption: (option: LearningOption) => void;
}

const SlidingMenu = ({
  isOpen,
  setIsOpen,
  onChangeWordsList,
  selectedLearningOption,
  setSelectedLearningOption,
}: Props) => {
  const practiceWords = useSelector(practiceListSelector);
  const learnedList = useSelector(learnedListSelector);

  const amountToPractice = useSelector(practiceAmountSelector);

  const savePracticedWords = async () => {
    if (practiceWords.length > 0) {
      const shuffledPracticedList = getShuffledList(practiceWords);
      const wordsToPractice = shuffledPracticedList.slice(0, amountToPractice);
      onChangeWordsList(wordsToPractice);
      setSelectedLearningOption(LearningOption.PRACTICE);
      setIsOpen(false);
      //   setErrorText(undefined);
    } else {
      //   setErrorText("Words list is empty");
    }
  };

  const saveLearnedWords = async () => {
    if (learnedList.length > 0) {
      onChangeWordsList(learnedList);
      setSelectedLearningOption(LearningOption.KNOW);
      setIsOpen(false);
      //   setErrorText(undefined);
    } else {
      //   setErrorText("Words list is empty");
    }
  };

  const NEW_WORDS_GENERATOR_SIZE = 70;
  translate.engine = "google";

  const saveRandomList = async () => {
    const randomWordsToLearn = randomWords(NEW_WORDS_GENERATOR_SIZE);
    const wordsList: Word[] = [];
    for (const word of randomWordsToLearn) {
      const spanishTrans = await translate(word, "es");
      wordsList.push({
        english: word,
        spanish: spanishTrans,
      });
    }
    onChangeWordsList(wordsList);
    setSelectedLearningOption(LearningOption.NEW);
    setIsOpen(false);
  };

  return (
    <Sidebar
      sidebar={
        <div>
          <MenuOptionItem
            onClick={() => saveRandomList()}
            reactIcon={BsDice3}
            text="New"
            disabled
          />
          <MenuOptionItem
            onClick={() => savePracticedWords()}
            reactIcon={GiStrongMan}
            text="Train"
          />
          <MenuOptionItem
            onClick={() => saveLearnedWords()}
            reactIcon={BiMemoryCard}
            text="Know"
          />
          <MenuOptionItem
            onClick={() => saveLearnedWords()}
            reactIcon={BiCategoryAlt}
            text="Subjects"
          />
          <MenuOptionItem
            onClick={() => saveLearnedWords()}
            reactIcon={BsChatDots}
            text="Chat"
          />
          <MenuOptionItem
            onClick={() => saveLearnedWords()}
            reactIcon={AiOutlineSetting}
            text="Settings"
          />
        </div>
      }
      open={isOpen}
      onSetOpen={(open) => setIsOpen(open)}
      styles={{ sidebar: { background: "white", width: "200px" } }}
    />
  );
};

export default SlidingMenu;
