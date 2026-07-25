import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    selectedConversation: null,
  },
  reducers: {
    setConversation: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (statte, action) => {
      state.conversations.unshift(action.payload);
    },
    setSelectConversation: (state, action) => {
      state.selectConversation.unshift(action.payload);
    },
  },
});
export const { setConversation, addConversation, setSelectConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
