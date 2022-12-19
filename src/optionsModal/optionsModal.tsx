import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import randomWords from "random-words";
import { useState } from "react";
import { AiOutlineClear, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { BiCategoryAlt, BiMemoryCard } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom, GiStrongMan } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import translate from "translate";
import { LearningOption } from "../models/learningOption";
import { SUBJECT_LIST_MAP } from "../models/subjects/subjectsListsMap";
import { SubjectType } from "../models/subjects/subjectType";
import { Word } from "../models/word";
import { learnedListSelector } from "../stateManagement/learnedList";
import {
  practiceListSelector,
  setPracticeList,
} from "../stateManagement/practiceList";
import { getShuffledList } from "../utils/randomFuncs";
import { LearnedList } from "./learnedList/learnedList";
import { OptionItem } from "./optionItem/OptionItem";
import "./optionsModal.css";
import { PracticeList } from "./practicedList/practiceList";
import { SubjectsOption } from "./subjectsOption/subjectsOption";

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
  const [amountToPractice, setAmountToPractice] = useState(10);
  const [selectedSubject, setSelectedSubject] = useState(SubjectType.COLORS);

  const practiceWords = useSelector(practiceListSelector);
  const learnedList = useSelector(learnedListSelector);

  const dispatch = useDispatch();

  translate.engine = "google";
  const NEW_WORDS_GENERATOR_SIZE = 70;

  const saveRandomList = async () => {
    setIsLoading(true);
    setErrorText(undefined);
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
      const shuffledPracticedList = getShuffledList(practiceWords);
      const wordsToPractice = shuffledPracticedList.slice(0, amountToPractice);
      onChangeWordsList(wordsToPractice);
      setSelectedLearningOption(LearningOption.PRACTICE);
      setIsOpen(false);
      setErrorText(undefined);
    } else {
      setErrorText("Words list is empty");
    }
  };

  const saveLearnedWords = async () => {
    if (learnedList.length > 0) {
      onChangeWordsList(learnedList);
      setSelectedLearningOption(LearningOption.KNOW);
      setIsOpen(false);
      setErrorText(undefined);
    } else {
      setErrorText("Words list is empty");
    }
  };

  const getWordsListFromInput = () => {
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
          spanish: englishTranslation,
          english: spanishTranslation,
        });
      }
    }

    console.log("list");
    console.log(JSON.stringify(finalWordsList));
    return finalWordsList;
  };

  const saveCustomList = () => {
    try {
      const clientWordsList: Word[] = getWordsListFromInput();

      if (clientWordsList.length === 0) {
        setErrorText("Not valid format");
      } else {
        onChangeWordsList(clientWordsList);
        setSelectedLearningOption(LearningOption.CUSTOM);
        setIsOpen(false);
        setErrorText(undefined);
      }
    } catch (e) {
      setErrorText("Error while reading text. Try again later");
    }
  };

  const saveSubjectsList = () => {
    const clientWordsList = SUBJECT_LIST_MAP[selectedSubject];
    onChangeWordsList(clientWordsList);
    setSelectedLearningOption(LearningOption.SUBJECTS);
    setIsOpen(false);
    setErrorText(undefined);
  };

  const learningHandlers = {
    [LearningOption.CUSTOM]: saveCustomList,
    [LearningOption.NEW]: saveRandomList,
    [LearningOption.PRACTICE]: savePracticedWords,
    [LearningOption.SUBJECTS]: saveSubjectsList,
    [LearningOption.KNOW]: saveLearnedWords,
  };

  const saveOptions = async () => {
    const learningOptionHandler = learningHandlers[selectedOption];
    await learningOptionHandler();
  };

  const addCustomWordsToPractice = () => {
    const clientWordsList: Word[] = getWordsListFromInput();
    const newPracticedWordsList = [...practiceWords];
    for (const newWord of clientWordsList) {
      if (
        !newPracticedWordsList.some(
          (word: Word) => word.english === newWord.english
        )
      ) {
        newPracticedWordsList.push(newWord);
      }
    }

    dispatch(setPracticeList(newPracticedWordsList));
  };

  const clearPracticeWordsList = () => {
    dispatch(setPracticeList([]));
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
              reactIcon={GiStrongMan}
              setSelectedOption={setSelectedOption}
              text="Train"
            />
            <OptionItem
              optionType={LearningOption.CUSTOM}
              isSelecteed={selectedOption === LearningOption.CUSTOM}
              reactIcon={FaEdit}
              setSelectedOption={setSelectedOption}
              text="Set"
            />
            <OptionItem
              optionType={LearningOption.SUBJECTS}
              isSelecteed={selectedOption === LearningOption.SUBJECTS}
              reactIcon={BiCategoryAlt}
              setSelectedOption={setSelectedOption}
              text="Subs"
            />
            <OptionItem
              optionType={LearningOption.KNOW}
              isSelecteed={selectedOption === LearningOption.KNOW}
              reactIcon={BiMemoryCard}
              setSelectedOption={setSelectedOption}
              text="Know"
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
            {selectedOption === LearningOption.KNOW &&
              learnedList.length === 0 && (
                <div style={{ margin: "auto" }}>You didn't learn new Words</div>
              )}
            {selectedOption === LearningOption.NEW && (
              <div style={{ margin: "auto" }}>Learn New Words!</div>
            )}
            {selectedOption === LearningOption.PRACTICE &&
              practiceWords.length > 0 && (
                <PracticeList
                  amountToPractice={amountToPractice}
                  setAmountToPractice={setAmountToPractice}
                />
              )}
            {selectedOption === LearningOption.KNOW &&
              practiceWords.length > 0 && <LearnedList />}

            {selectedOption === LearningOption.SUBJECTS && (
              <SubjectsOption
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
              />
            )}
          </div>
        </div>
        <div className="applyListButton">
          {isLoading && <ClipLoader size={30} color="#36d7b7" />}
          {!isLoading && (
            <>
              <AiOutlineSave onClick={saveOptions} size={30} />
              {selectedOption === LearningOption.KNOW && (
                <div style={{ fontSize: 13, marginTop: 5 }}>
                  ({learnedList.length})
                </div>
              )}
            </>
          )}
        </div>
        {selectedOption === LearningOption.CUSTOM && (
          <div className="extraActionButton" onClick={addCustomWordsToPractice}>
            <AiOutlinePlus size={30} />
          </div>
        )}
        {selectedOption === LearningOption.PRACTICE && (
          <div className="extraActionButton" onClick={clearPracticeWordsList}>
            <AiOutlineClear size={30} />
            <div style={{ fontSize: 13, marginTop: 5 }}>
              ({practiceWords.length})
            </div>
          </div>
        )}
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
