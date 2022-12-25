import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../models/word";
import {
  getPracticeAmount,
  savePracticeAmount,
} from "../utils/localstorage/practiceWordsAmountLocalStorage";

const initialAmount = getPracticeAmount();

export const slice = createSlice({
  name: "settings",
  initialState: {
    practiceWordsAmount: initialAmount,
    isRevealEnabled: true,
    isTimerModeEnabled: false,
  },
  reducers: {
    setPracticeAmount: (state: any, action: PayloadAction<number>) => {
      state.practiceWordsAmount = action.payload;
      savePracticeAmount(action.payload);
    },
    setIsRevealEnabled: (state: any, action: PayloadAction<boolean>) => {
      state.isRevealEnabled = action.payload;
    },
    setIsTimerModeEnabled: (state: any, action: PayloadAction<boolean>) => {
      state.isTimerModeEnabled = action.payload;
    },
  },
});

export const isRevealEnabledSelected = (state: any): boolean => {
  return state.settings.isRevealEnabled;
};

export const isTimerModeEnabledSelector = (state: any): boolean => {
  return state.settings.isTimerModeEnabled;
};

export const practiceAmountSelector = (state: any): number => {
  return state.settings.practiceWordsAmount;
};

export const { setPracticeAmount, setIsRevealEnabled, setIsTimerModeEnabled } =
  slice.actions;
export const reducer = slice.reducer;
