import { createSlice } from "@reduxjs/toolkit";

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: { open: false, trigger: null, query: "" },
  reducers: {
    openSuggestions: (state, action) => {
      state.open = true;
      state.trigger = action.payload.trigger;
    },
    closeSuggestions: (state) => {
      state.open = false;
      state.query = "";
      state.trigger = null;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { openSuggestions, closeSuggestions, setQuery } =
  suggestionsSlice.actions;
export default suggestionsSlice.reducer;
