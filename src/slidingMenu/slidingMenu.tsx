import React from "react";
import Sidebar from "react-sidebar";
import "./slidingMenu.css";
import { useSelector } from "react-redux";
import { practiceListSelector } from "../stateManagement/practiceList";
import { getShuffledList } from "../utils/randomFuncs";
import { practiceAmountSelector } from "../stateManagement/settings";
import { Word } from "../models/word";
import { LearningOption } from "../models/learningOption";

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

  return (
    <Sidebar
      sidebar={
        <div>
          <div className="menuOptionItem">New</div>
          <div className="menuOptionItem" onClick={() => savePracticedWords()}>
            Train
          </div>
          <div className="menuOptionItem">Know</div>
          <div className="menuOptionItem">Subjects</div>
          <div className="menuOptionItem">Chat</div>
          <div className="menuOptionItem">Settings</div>
        </div>
      }
      open={isOpen}
      onSetOpen={(open) => setIsOpen(open)}
      styles={{ sidebar: { background: "white", width: "200px" } }}
    />
  );
};

export default SlidingMenu;
