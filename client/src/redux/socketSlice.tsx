import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

// Define your chat state here

export interface User {
    // email: string;
    socketId: string;
}

interface UsersState {
    onlineUsers: string[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    onlineUsers: [],
    loading: false,
    error: null,
};

// Initialize your chat state here

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        addOnlineUser(state, action) {
            state.onlineUsers = state.onlineUsers.concat(action.payload);
        },
        // addAichat(state, action) {
        //     const { message } = action.payload;
        //     const lastMessage = state[state.length - 1];
        //     if (lastMessage.own == true) {
        //         state.push(action.payload);
        //     } else {
        //         state[state.length - 1] = action.payload;
        //     }
        // },
    },
});

export const { addOnlineUser } = socketSlice.actions;
export default socketSlice.reducer;
