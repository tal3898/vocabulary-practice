import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import translate from "translate";
import "./optionsModal.css";
import { Word } from "../models/word";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  onChangeWordsList: (wordsList: Word[]) => void;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const OptionsModal = ({ onChangeWordsList, open, setIsOpen }: Props) => {
  const [wordsInputText, setWordsInputText] = useState("");
  const [hasError, setHasError] = useState(false);

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

  return (
    <Modal
      open={open}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ marginBottom: 5, fontSize: 20 }}>
          List the words to practice
        </div>
        <div
          style={{ visibility: hasError ? "visible" : "hidden" }}
          className="errorText"
        >
          Error: Not valid format
        </div>
        <div style={{ width: "100%", height: "10rem", paddingRight: 10 }}>
          <textarea
            value={wordsInputText}
            onChange={(e) => setWordsInputText(e.target.value)}
            name="Text1"
            style={{ resize: "none", width: "100%", height: "100%" }}
          />
        </div>
        <div className="applyListButton">
          <CiPlay1 onClick={changeWordsList} size={30} />
        </div>
      </Box>
    </Modal>
  );
};
