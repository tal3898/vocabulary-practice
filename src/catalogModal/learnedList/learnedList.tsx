import { CgRemove } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { Word } from "../../models/word";
import {
  learnedListSelector,
  setLearnedList,
} from "../../stateManagement/learnedList";
import {
  practiceListSelector,
  setPracticeList,
} from "../../stateManagement/practiceList";
import "./learnedList.css";

export const LearnedList = () => {
  const learnedWords = useSelector(learnedListSelector);
  const practiceWords = useSelector(practiceListSelector);
  const dispatch = useDispatch();

  const removeLearnedWord = (word: Word) => {
    const wordIndex = learnedWords.findIndex(
      (w: Word) => w.english === word.english
    );
    const newLearnedList = [
      ...learnedWords.slice(0, wordIndex),
      ...learnedWords.slice(wordIndex + 1),
    ];

    const newPracticedList = [...practiceWords, word];
    dispatch(setLearnedList(newLearnedList));
    dispatch(setPracticeList(newPracticedList));
  };

  return (
    <div className="learnedWordsList">
      {learnedWords.map((item: Word) => (
        <div key={item.english} className="learnedWordItem">
          <div
            className="learnedRemoveButton"
            onClick={() => removeLearnedWord(item)}
          >
            <CgRemove />
          </div>
          <div className="learnedEnglish">{item.english}</div>
          <div className="learnedSpanish">{item.spanish}</div>
        </div>
      ))}
    </div>
  );
};
