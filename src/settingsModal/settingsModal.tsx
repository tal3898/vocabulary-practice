import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
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

  const dispatch = useDispatch();

  return (
    <Dialog
      open={isOptionsOpen}
      onClose={() => setIsOptionsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Settings</DialogTitle>
      <DialogContent>
        <div>Number of words to practice on</div>
        <input
          value={amountToPractice}
          onChange={(e) => dispatch(setPracticeAmount(+e.target.value))}
          className="amountInput"
          type="number"
          min="5"
          max={practiceWords.length}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOptionsOpen(false)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
