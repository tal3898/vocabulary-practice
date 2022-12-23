import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../models/word";
import {
  getPracticeAmount,
  savePracticeAmount,
} from "../utils/localstorage/practiceWordsAmountLocalStorage";

export const slice = createSlice({
  name: "isRevealEnabled",
  initialState: {
    isRevealEnabled: true,
  },
  reducers: {
    setIsRevealEnabled: (state: any, action: PayloadAction<boolean>) => {
      state.isRevealEnabled = action.payload;
    },
  },
});

export const isRevealEnabledSelected = (state: any): boolean => {
  return state.isRevealEnabled.isRevealEnabled;
};

export const { setIsRevealEnabled } = slice.actions;
export const reducer = slice.reducer;
