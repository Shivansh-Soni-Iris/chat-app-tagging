import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./messageSlice";
import suggestionsReducer from "./suggestionSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    suggestions: suggestionsReducer,
  },
});

export default store;
