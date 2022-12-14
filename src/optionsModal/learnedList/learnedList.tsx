import { CgRemove } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { Word } from "../../models/word";
import {
  practiceListSelector,
  setPracticeList,
} from "../../stateManagement/practiceList";
import "./learnedList.css";

export const LearnedList = () => {
  const practiceWords = useSelector(practiceListSelector);
  const dispatch = useDispatch();

  const removePracticedWord = (word: Word) => {
    const wordIndex = practiceWords.findIndex(
      (w: Word) => w.english === word.english
    );
    const newList = [
      ...practiceWords.slice(0, wordIndex),
      ...practiceWords.slice(wordIndex + 1),
    ];
    dispatch(setPracticeList(newList));
  };

  return (
    <div className="learnedWordsList">
      {practiceWords.map((item: Word) => (
        <div key={item.english} className="learnedWordItem">
          <div
            className="learnedRemoveButton"
            onClick={() => removePracticedWord(item)}
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
