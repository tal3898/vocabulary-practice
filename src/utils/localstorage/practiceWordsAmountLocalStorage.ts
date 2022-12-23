import { Word } from "../../models/word";

const learnedKey = "practiceAmount";
const defaultValue = 15;

export const getPracticeAmount = (): number => {
  const amount = localStorage.getItem(learnedKey);
  if (amount !== null) {
    return +amount;
  } else {
    return defaultValue;
  }
};

export const savePracticeAmount = (amount: number) => {
  localStorage.setItem(learnedKey, amount.toString());
};
