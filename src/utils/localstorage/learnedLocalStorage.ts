import { Word } from "../../models/word";

const learnedKey = "learnedWords";

export const getLearnedWords = (): Word[] => {
  return JSON.parse(localStorage.getItem(learnedKey) ?? "[]");
};

export const saveLearnedWords = (list: Word[]) => {
  localStorage.setItem(learnedKey, JSON.stringify(list));
};
