import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { CgRemove } from "react-icons/cg";
import randomWords from "random-words";
import { AiOutlineSave } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import translate from "translate";
import { LearningOption } from "../models/learningOption";
import { Word } from "../models/word";
import {
  getPracticeWords,
  savePracticeWords,
} from "../utils/practiceLocalStorage";
import { OptionItem } from "./optionItem/OptionItem";
import "./optionsModal.css";
import ClipLoader from "react-spinners/ClipLoader";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(70%, 550px)",
  height: "min(70%, 400px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  onChangeWordsList: (wordsList: Word[]) => void;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedLearningOption: LearningOption;
  setSelectedLearningOption: (option: LearningOption) => void;
}

export const OptionsModal = ({
  selectedLearningOption,
  setSelectedLearningOption,
  onChangeWordsList,
  open,
  setIsOpen,
}: Props) => {
  const [wordsInputText, setWordsInputText] = useState("");
  const [errorText, setErrorText] = useState<undefined | string>();
  const [selectedOption, setSelectedOption] = useState(selectedLearningOption);
  const [isLoading, setIsLoading] = useState(false);
  const [practiceWords, setPracticeWords] = useState(getPracticeWords());

  translate.engine = "google";
  const NEW_WORDS_GENERATOR_SIZE = 70;

  useEffect(() => {
    setPracticeWords(getPracticeWords());
  }, [open]);

  const saveRandomList = async () => {
    setIsLoading(true);
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
    setErrorText(undefined);
    setIsLoading(false);
  };

  const savePracticedWords = async () => {
    if (practiceWords.length > 0) {
      onChangeWordsList(practiceWords);
      setSelectedLearningOption(LearningOption.PRACTICE);
      setIsOpen(false);
      setErrorText(undefined);
    } else {
      setErrorText("Words list is empty");
    }
  };

  const saveCustomList = () => {
    try {
      const allWords = wordsInputText.split("\n");
      const finalWordsList: Word[] = [];
      for (const word of allWords) {
        const wordParts = word.split(" - ");
        const spanishTranslation = wordParts[0];
        const englishTranslation = wordParts[1];
        if (
          spanishTranslation !== undefined &&
          englishTranslation !== undefined
        ) {
          finalWordsList.push({
            english: englishTranslation,
            spanish: spanishTranslation,
          });
        }
      }

      if (finalWordsList.length === 0) {
        setErrorText("Not valid format");
      } else {
        onChangeWordsList(finalWordsList);
        setSelectedLearningOption(LearningOption.CUSTOM);
        setIsOpen(false);
        setErrorText(undefined);
      }
    } catch (e) {
      setErrorText("Error while reading text. Try again later");
    }
  };

  const learningHandlers = {
    [LearningOption.CUSTOM]: saveCustomList,
    [LearningOption.NEW]: saveRandomList,
    [LearningOption.PRACTICE]: savePracticedWords,
  };

  const saveOptions = async () => {
    const learningOptionHandler = learningHandlers[selectedOption];
    await learningOptionHandler();
  };

  const removePracticedWord = (word: Word) => {
    const wordIndex = practiceWords.findIndex(
      (w: Word) => w.english === word.english
    );
    const newList = [
      ...practiceWords.slice(0, wordIndex),
      ...practiceWords.slice(wordIndex + 1),
    ];
    savePracticeWords(newList);
    setPracticeWords(newList);
  };

  const onClose = () => {
    setSelectedOption(selectedLearningOption);
    setIsOpen(false);
    setErrorText(undefined);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div className="practiceOptions">
            <OptionItem
              optionType={LearningOption.NEW}
              isSelecteed={selectedOption === LearningOption.NEW}
              reactIcon={GiPerspectiveDiceSixFacesRandom}
              setSelectedOption={setSelectedOption}
              text="New"
            />
            <OptionItem
              optionType={LearningOption.PRACTICE}
              isSelecteed={selectedOption === LearningOption.PRACTICE}
              reactIcon={GrUserWorker}
              setSelectedOption={setSelectedOption}
              text="Practice"
            />
            <OptionItem
              optionType={LearningOption.CUSTOM}
              isSelecteed={selectedOption === LearningOption.CUSTOM}
              reactIcon={FaEdit}
              setSelectedOption={setSelectedOption}
              text="Custom"
            />
          </div>
          <div style={{ display: "flex", height: "74%" }}>
            {selectedOption === LearningOption.CUSTOM && (
              <div style={{ width: "100%" }}>
                <div style={{ marginBottom: 15, fontSize: 20 }}>
                  List the words to practice
                </div>

                <div
                  style={{ width: "100%", height: "15rem", paddingRight: 10 }}
                >
                  <textarea
                    value={wordsInputText}
                    onChange={(e) => setWordsInputText(e.target.value)}
                    name="Text1"
                    style={{ resize: "none", width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            )}
            {selectedOption === LearningOption.PRACTICE &&
              practiceWords.length === 0 && (
                <div style={{ margin: "auto" }}>
                  You didn't learn new Words to practice with
                </div>
              )}
            {selectedOption === LearningOption.NEW && (
              <div style={{ margin: "auto" }}>Learn New Words!</div>
            )}
            {selectedOption === LearningOption.PRACTICE &&
              practiceWords.length > 0 && (
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
              )}
          </div>
        </div>
        <div className="applyListButton">
          {isLoading && <ClipLoader size={30} color="#36d7b7" />}
          {!isLoading && <AiOutlineSave onClick={saveOptions} size={30} />}
        </div>
        <div
          style={{ visibility: errorText !== undefined ? "visible" : "hidden" }}
          className="errorText"
        >
          {errorText}
        </div>
      </Box>
    </Modal>
  );
};
