import { configureStore } from "@reduxjs/toolkit";
import { reducer as practiceListReducer } from "./practiceList";
import { reducer as learnedListReducer } from "./learnedList";
import { reducer as practiceAmountReducer } from "./settings";
import { reducer as revealOptionReducer } from "./revealOption";

export default configureStore({
  reducer: {
    practiceList: practiceListReducer,
    learnedList: learnedListReducer,
    settings: practiceAmountReducer,
    isRevealEnabled: revealOptionReducer,
  },
});
