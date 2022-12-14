import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../models/word";
import {
  getPracticeWords,
  savePracticeWords,
} from "../utils/practiceLocalStorage";

const initialPracticeList = getPracticeWords();

export const slice = createSlice({
  name: "practiceList",
  initialState: {
    practiceList: initialPracticeList,
  },
  reducers: {
    setPracticeList: (state: any, action: PayloadAction<Word[]>) => {
      state.practiceList = action.payload;
      savePracticeWords(action.payload);
    },
  },
});

export const practiceListSelector = (state: any): Word[] => {
  return state.practiceList.practiceList;
};
export const { setPracticeList } = slice.actions;
export const reducer = slice.reducer;
