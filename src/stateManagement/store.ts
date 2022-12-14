import { configureStore } from "@reduxjs/toolkit";
import { reducer as practiceListReducer } from "./practiceList";
import { reducer as learnedListReducer } from "./learnedList";

export default configureStore({
  reducer: {
    practiceList: practiceListReducer,
    learnedList: learnedListReducer,
  },
});
