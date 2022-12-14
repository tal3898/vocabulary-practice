import { configureStore } from "@reduxjs/toolkit";
import { reducer as practiceListReducer } from "./practiceList";
import { reducer as learnedListReducer } from "./learnedList";
import { reducer as practiceAmountReducer } from "./settings";

export default configureStore({
  reducer: {
    practiceList: practiceListReducer,
    learnedList: learnedListReducer,
    settings: practiceAmountReducer,
  },
});
