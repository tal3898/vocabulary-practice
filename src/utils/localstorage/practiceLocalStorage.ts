import { Word } from "../../models/word";

const practiceKey = "practiceWords";

export const getPracticeWords = (): Word[] => {
  return JSON.parse(localStorage.getItem(practiceKey) ?? "[]");
};

export const savePracticeWords = (list: Word[]) => {
  localStorage.setItem(practiceKey, JSON.stringify(list));
};
