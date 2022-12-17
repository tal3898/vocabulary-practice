import { CgRemove } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { Word } from "../../models/word";
import {
  practiceListSelector,
  setPracticeList,
} from "../../stateManagement/practiceList";
import "./practiceList.css";

interface Props {
  amountToPractice: number;
  setAmountToPractice: (amount: number) => void;
}

export const PracticeList = ({
  amountToPractice,
  setAmountToPractice,
}: Props) => {
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
    <div className="practiceBox">
      <div className="amountOption">
        <div>practice words count</div>
        <input
          value={amountToPractice}
          onChange={(e) => setAmountToPractice(+e.target.value)}
          className="amountInput"
          type="number"
          min="5"
          max={practiceWords.length}
        />
      </div>
      <div className="practicedWordsList">
        {practiceWords.map((item: Word) => (
          <div key={item.english} className="practicedWordItem">
            <div
              className="practiceRemoveButton"
              onClick={() => removePracticedWord(item)}
            >
              <CgRemove />
            </div>
            <div className="practicedEnglish">{item.english}</div>
            <div className="practicedSpanish">{item.spanish}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
