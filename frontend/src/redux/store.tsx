import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducer/counter";
import searchInputReducer from "./reducer/searchInput";

export default configureStore({
  reducer: {
    counter: counterReducer,
    searchInput: searchInputReducer,
  },
});
