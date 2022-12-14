import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../models/word";
import { savePracticeWords } from "../utils/practiceLocalStorage";

export const slice = createSlice({
  name: "practiceList",
  initialState: {
    practiceList: [],
  },
  reducers: {
    setPracticeList: (state: any, action: PayloadAction<Word[]>) => {
      state.practiceList = action.payload;
      savePracticeWords(action.payload);
    },
  },
});

export const { setPracticeList } = slice.actions;
export const reducer = slice.reducer;
