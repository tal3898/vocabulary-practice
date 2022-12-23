import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  isOptionsOpen: boolean;
  setIsOptionsOpen: (open: boolean) => void;
}

export const SettingsModal = ({ isOptionsOpen, setIsOptionsOpen }: Props) => {
  return (
    <Dialog
      open={isOptionsOpen}
      onClose={() => setIsOptionsOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to clear all the words?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          When clearing and removing all the words you won't be able to recover
          them
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOptionsOpen(false)} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
