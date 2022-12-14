import { useMemo } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
  AiFillCheckCircle,
} from "react-icons/ai";
import { CgRemove } from "react-icons/cg";
import { IoMdRemoveCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Word } from "../../models/word";
import { WordStatus } from "../../models/WordStatus";
import {
  learnedListSelector,
  setLearnedList,
} from "../../stateManagement/learnedList";
import {
  practiceListSelector,
  setPracticeList,
} from "../../stateManagement/practiceList";
import "./cardActionsButtons.css";

interface Props {
  word: Word;
}

export const CardActionsButtons = ({ word }: Props) => {
  const practiceWords = useSelector(practiceListSelector);
  const learnedWords = useSelector(learnedListSelector);
  const dispatch = useDispatch();

  const wordCurrentStatus = useMemo(() => {
    const isPracticed = practiceWords.some(
      (curWord: Word) => curWord.english === word.english
    );
    const isLearned = learnedWords.some(
      (curWord: Word) => curWord.english === word.english
    );

    if (isPracticed) {
      return WordStatus.PRACTICED;
    } else if (isLearned) {
      return WordStatus.KNOW;
    } else {
      return WordStatus.NONE;
    }
  }, [practiceWords, learnedWords, word]);

  const addNewWordToPractice = () => {
    const newPracticeList = [...practiceWords, word];
    const newLearnListList = learnedWords.filter(
      (curWord: Word) => curWord.english !== word.english
    );
    dispatch(setPracticeList(newPracticeList));
    dispatch(setLearnedList(newLearnListList));
  };

  const addNewWordToLearned = () => {
    const newLearnListList = [...learnedWords, word];
    const newPracticeList = practiceWords.filter(
      (curWord: Word) => curWord.english !== word.english
    );
    dispatch(setPracticeList(newPracticeList));
    dispatch(setLearnedList(newLearnListList));
  };

  const removeWordFromAllLists = () => {
    const newPracticeList = practiceWords.filter(
      (word: Word) => word.english !== word.english
    );
    const newLearnedList = learnedWords.filter(
      (word: Word) => word.english !== word.english
    );
    dispatch(setPracticeList(newPracticeList));
    dispatch(setLearnedList(newLearnedList));
  };

  return (
    <div className="cardActionsButton">
      {wordCurrentStatus === WordStatus.NONE && (
        <div className="addToPracticeAction">
          <IoMdRemoveCircle size={26} color="#f57c00" />
        </div>
      )}
      {wordCurrentStatus !== WordStatus.NONE && (
        <div className="addToPracticeAction" onClick={removeWordFromAllLists}>
          <CgRemove size={26} color="#f57c00" />
        </div>
      )}

      {wordCurrentStatus !== WordStatus.PRACTICED && (
        <div className="addToPracticeAction" onClick={addNewWordToPractice}>
          <AiOutlinePlusCircle size={26} color="#f9a825" />
        </div>
      )}
      {wordCurrentStatus === WordStatus.PRACTICED && (
        <div className="addToPracticeAction">
          <AiFillPlusCircle size={26} color="#f9a825" />
        </div>
      )}

      {wordCurrentStatus === WordStatus.KNOW && (
        <div className="addToPracticeAction">
          <AiFillCheckCircle size={26} color="#66bb6a" />
        </div>
      )}
      {wordCurrentStatus !== WordStatus.KNOW && (
        <div className="addToPracticeAction" onClick={addNewWordToLearned}>
          <AiOutlineCheckCircle size={26} color="#66bb6a" />
        </div>
      )}
    </div>
  );
};
