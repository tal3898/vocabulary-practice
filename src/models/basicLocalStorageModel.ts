export class BasicLocalStorageModel<T> {
  modelKey;
  defaultValue;

  constructor(_defaultValue: T) {
    this.modelKey = this.constructor.name;
    this.defaultValue = _defaultValue;
  }

  getPracticeAmount = (): T => {
    return JSON.parse(localStorage.getItem(this.modelKey) ?? "[]");
  };

  savePracticeAmount = (list: T) => {
    localStorage.setItem(this.modelKey, JSON.stringify(list));
  };
}
