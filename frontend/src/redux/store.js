import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import conversationReducer from "./conversationSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    conversationReducer: conversationReducer,
  },
});
