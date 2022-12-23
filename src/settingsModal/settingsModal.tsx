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
import "./settingsModal.css";
import Switch from "@mui/material/Switch";
import {
  isRevealEnabledSelected,
  setIsRevealEnabled,
} from "../stateManagement/revealOption";

interface Props {
  isOptionsOpen: boolean;
  setIsOptionsOpen: (open: boolean) => void;
}

export const SettingsModal = ({ isOptionsOpen, setIsOptionsOpen }: Props) => {
  const amountToPractice = useSelector(practiceAmountSelector);
  const isRevealEnabled = useSelector(isRevealEnabledSelected);
  const practiceWords = useSelector(practiceListSelector);

  const [clientAmountToPractice, setClientAmountToPractice] =
    useState(amountToPractice);
  const [isRevealChecked, setIsRevealChecked] = useState(true);

  const dispatch = useDispatch();

  const saveSettings = () => {
    dispatch(setPracticeAmount(clientAmountToPractice));
    dispatch(setIsRevealEnabled(isRevealChecked));
    setIsOptionsOpen(false);
  };

  const cancelSettings = () => {
    setClientAmountToPractice(amountToPractice);
    setIsRevealChecked(isRevealEnabled);
    setIsOptionsOpen(false);
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
          <div>Enable reveal button</div>
          <Switch
            checked={isRevealChecked}
            onChange={(e) => setIsRevealChecked(e.target.checked)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveSettings}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
