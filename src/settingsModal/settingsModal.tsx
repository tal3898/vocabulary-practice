import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  practiceListSelector,
  setPracticeList,
} from "../stateManagement/practiceList";
import {
  isRevealEnabledSelected,
  isTimerModeEnabledSelector,
  practiceAmountSelector,
  setIsRevealEnabled,
  setIsTimerModeEnabled,
  setPracticeAmount,
} from "../stateManagement/settings";
import "./settingsModal.css";
import Switch from "@mui/material/Switch";
import { Word } from "../models/word";
import { isWordInList } from "../utils/wordsList";
import { learnedListSelector } from "../stateManagement/learnedList";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  isOptionsOpen: boolean;
  setIsOptionsOpen: (open: boolean) => void;
}

export const SettingsModal = ({ isOptionsOpen, setIsOptionsOpen }: Props) => {
  const amountToPractice = useSelector(practiceAmountSelector);
  const isRevealEnabled = useSelector(isRevealEnabledSelected);
  const isTimerMode = useSelector(isTimerModeEnabledSelector);
  const practiceWords = useSelector(practiceListSelector);
  const learnedList = useSelector(learnedListSelector);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const [addedWordsToPractice, setAddedWordsToPractice] = useState<
    number | undefined
  >(undefined);
  const [clientAmountToPractice, setClientAmountToPractice] =
    useState(amountToPractice);
  const [isRevealChecked, setIsRevealChecked] = useState(true);
  const [isTimerModeChecked, setIsTimerModeChecked] = useState(false);
  const [wordsInputText, setWordsInputText] = useState("");

  const dispatch = useDispatch();

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
          english: englishTranslation,
          spanish: spanishTranslation,
        });
      }
    }

    return finalWordsList;
  };

  const addCustomWordsToPractice = () => {
    const clientWordsList: Word[] = getWordsListFromInput();
    const newPracticedWordsList = [...practiceWords];
    let addedWordsCount = 0;
    for (const newWord of clientWordsList) {
      if (
        !isWordInList(newWord, newPracticedWordsList) &&
        !isWordInList(newWord, learnedList)
      ) {
        newPracticedWordsList.push(newWord);
        addedWordsCount++;
      }
    }

    setAddedWordsToPractice(addedWordsCount);
    dispatch(setPracticeList(newPracticedWordsList));
  };

  const saveSettings = () => {
    dispatch(setPracticeAmount(clientAmountToPractice));
    dispatch(setIsRevealEnabled(isRevealChecked));
    dispatch(setIsTimerModeEnabled(isTimerModeChecked));
    setIsOptionsOpen(false);
  };

  const cancelSettings = () => {
    setClientAmountToPractice(amountToPractice);
    setIsRevealChecked(isRevealEnabled);
    setIsTimerModeChecked(isTimerMode);
    setIsOptionsOpen(false);
  };

  const clearPracticeWordsList = () => {
    dispatch(setPracticeList([]));
    setIsWarningOpen(false);
  };

  return (
    <Dialog
      open={isOptionsOpen}
      onClose={cancelSettings}
      fullWidth={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Settings</DialogTitle>
      <DialogContent>
        <div className="optionItemToChange">
          <div>Number of words to practice on</div>
          <input
            value={clientAmountToPractice}
            onChange={(e) => setClientAmountToPractice(+e.target.value)}
            className="amountInput"
            type="number"
            min="5"
            max={practiceWords.length}
          />
        </div>
        <div className="optionItemToChange">
          <div className="enableRevealOptionTitle">Enable reveal button</div>
          <Switch
            checked={isRevealChecked}
            onChange={(e) => {
              if (e.target.checked) {
                setIsTimerModeChecked(false);
              }
              setIsRevealChecked(e.target.checked);
            }}
          />
        </div>
        <div className="optionItemToChange">
          <div className="enableRevealOptionTitle">Enable timer mode</div>
          <Switch
            checked={isTimerModeChecked}
            onChange={(e) => {
              if (e.target.checked) {
                setIsRevealChecked(false);
              }
              setIsTimerModeChecked(e.target.checked);
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <div className="wordsToAddTitle">
            <div>Add words to practice list</div>
            <div className="addWordsButton" onClick={addCustomWordsToPractice}>
              <AiOutlinePlus size={20} />
            </div>
          </div>

          <div
            style={{
              fontSize: 12,
              visibility:
                addedWordsToPractice !== undefined ? "visible" : "hidden",
            }}
          >
            Added {addedWordsToPractice} words
          </div>
          <div style={{ width: "100%", height: "6rem", paddingRight: 10 }}>
            <textarea
              value={wordsInputText}
              onChange={(e) => setWordsInputText(e.target.value)}
              name="Text1"
              style={{ resize: "none", width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div
          className="clearPracticeBtn"
          onClick={() => setIsWarningOpen(true)}
        >
          Clear all practice words
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveSettings}>Save</Button>
      </DialogActions>

      <Dialog
        open={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to clear all the {practiceWords.length} words?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When clearing and removing all the words you won't be able to
            recover them
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearPracticeWordsList} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};
