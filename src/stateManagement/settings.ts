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
  },
  reducers: {
    setPracticeAmount: (state: any, action: PayloadAction<number>) => {
      state.practiceWordsAmount = action.payload;
      savePracticeAmount(action.payload);
    },
  },
});

export const practiceAmountSelector = (state: any): number => {
  return state.settings.practiceWordsAmount;
};

export const { setPracticeAmount } = slice.actions;
export const reducer = slice.reducer;
