import { configureStore } from "@reduxjs/toolkit";
import { reducer as practiceListReducer } from "./practiceList";

export default configureStore({
  reducer: {
    practiceList: practiceListReducer,
  },
});
