import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import translate from "translate";
import "./optionsModal.css";
import { Word } from "../models/word";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { AiOutlineSave } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { LearningOption } from "../models/learningOption";
import { OptionItem } from "./optionItem/OptionItem";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(70%, 550px)",
  height: "min(70%, 400px)",
  bgcolor: "background.paper",
  border: "2px solid #000",
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
  const [hasError, setHasError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedLearningOption);
  // const randomEnglishWords;
  const practiceWords = localStorage.getItem("practiceWords") ?? [];
  console.log({ practiceWords });
  translate.engine = "google";

  const changeWordsList = () => {
    try {
      console.log({ wordsInputText });
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

      onChangeWordsList(finalWordsList);
      setIsOpen(false);
      setHasError(false);
    } catch (e) {
      setHasError(true);
    }
  };

  const onClose = () => {
    setSelectedOption(selectedLearningOption);
    setIsOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setIsOpen(false)}
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
              text="New Words"
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
          <div style={{ display: "flex" }}>
            {selectedOption === LearningOption.CUSTOM && (
              <div style={{ width: "100%" }}>
                <div style={{ marginBottom: 5, fontSize: 20 }}>
                  List the words to practice
                </div>
                <div
                  style={{ visibility: hasError ? "visible" : "hidden" }}
                  className="errorText"
                >
                  Error: Not valid format
                </div>
                <div
                  style={{ width: "100%", height: "10rem", paddingRight: 10 }}
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
                  You didn't learn new Words to practiced with
                </div>
              )}
          </div>
        </div>
        <div className="applyListButton">
          <AiOutlineSave onClick={changeWordsList} size={30} />
        </div>
      </Box>
    </Modal>
  );
};
