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
import { practiceListSelector } from "../stateManagement/practiceList";
import {
  practiceAmountSelector,
  setPracticeAmount,
} from "../stateManagement/practiceWordsAmount";

interface Props {
  isOptionsOpen: boolean;
  setIsOptionsOpen: (open: boolean) => void;
}

export const SettingsModal = ({ isOptionsOpen, setIsOptionsOpen }: Props) => {
  const amountToPractice = useSelector(practiceAmountSelector);
  const practiceWords = useSelector(practiceListSelector);
  const [clientAmountToPractice, setClientAmountToPractice] =
    useState(amountToPractice);

  const dispatch = useDispatch();

  const saveSettings = () => {
    dispatch(setPracticeAmount(clientAmountToPractice));
    setIsOptionsOpen(false);
  };

  const cancelSettings = () => {
    setClientAmountToPractice(amountToPractice);
    setIsOptionsOpen(false);
  };

  return (
    <Dialog
      open={isOptionsOpen}
      onClose={cancelSettings}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Settings</DialogTitle>
      <DialogContent>
        <div>Number of words to practice on</div>
        <input
          value={clientAmountToPractice}
          onChange={(e) => setClientAmountToPractice(+e.target.value)}
          className="amountInput"
          type="number"
          min="5"
          max={practiceWords.length}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={saveSettings}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
