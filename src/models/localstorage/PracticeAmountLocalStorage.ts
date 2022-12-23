import { BasicLocalStorageModel } from "./basicLocalStorageModel";

export class PracticeAmountLocalStorage extends BasicLocalStorageModel<number> {
  constructor() {
    super(15);
  }
}
