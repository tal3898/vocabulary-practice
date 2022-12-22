import { Word } from "../models/word";

export const isWordInList = (word: Word, lst: Word[]) => {
  return lst.some(
    (currWord: Word) =>
      currWord.english === word.english && currWord.spanish === word.spanish
  );
};
