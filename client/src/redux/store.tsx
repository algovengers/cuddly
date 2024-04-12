import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
