import { createSlice } from "@reduxjs/toolkit";

export const searchInputSlice = createSlice({
  name: "searchInput",
  initialState: {
    searchInputs: "",
  },
  reducers: {
    getSearchInput: (state, action) => {
      state.searchInputs = action.payload;
    },
  },
});

export const { getSearchInput } = searchInputSlice.actions;

export default searchInputSlice.reducer;
