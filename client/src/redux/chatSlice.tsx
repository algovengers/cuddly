import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your chat state here

const initialState: any[] = [];
// Initialize your chat state here

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChat(state, action) {
      return [...action.payload];
    },
    addHumanChat(state, action) {
      state.push(action.payload);
    },
    addAichat(state, action) {
      const { message } = action.payload;
      const lastMessage = state[state.length - 1];
      if (lastMessage.own == true) {
        state.push(action.payload);
      } else {
        state[state.length - 1] = action.payload;
      }
    },
  },
});

export const { getChat, addHumanChat, addAichat } = chatSlice.actions;
export default chatSlice.reducer;
