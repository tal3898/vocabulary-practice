import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../models/word";
import {
  getLearnedWords,
  saveLearnedWords,
} from "../utils/learnedLocalStorage";

const initialList = getLearnedWords();

export const slice = createSlice({
  name: "learnedList",
  initialState: {
    learnList: initialList,
  },
  reducers: {
    setLearnedList: (state: any, action: PayloadAction<Word[]>) => {
      state.learnedList = action.payload;
      saveLearnedWords(action.payload);
    },
  },
});

export const learnedListSelector = (state: any): Word[] =>
  state.learnedList.learnedList;
export const { setLearnedList } = slice.actions;
export const reducer = slice.reducer;
