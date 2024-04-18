import { createSlice } from "@reduxjs/toolkit";

// Define your chat state here
interface ChatUser {
    id: string;
    userId: string;
    name: string;
    chatId: string;
}

interface Message {
    id: string;
    message: string;
    own: boolean;
}

interface Chat {
    id: string;
    users: ChatUser[];
    messages: Message[];
}

interface RootState {
    chats: Chat[];
    index: number;
}

const initialState: RootState = { chats: [], index: -1 };
// Initialize your chat state here

const userChatSlice = createSlice({
    name: "userChat",
    initialState,
    reducers: {
        setChat(state, action) {
            return { index: -1, chats: action.payload };
        },
        changeIndex(state, action) {
            state.index = action.payload.index;
        },
        setMessagesAtIndex(state, action) {
            state.chats[action.payload.index].messages =
                action.payload.messages;
        },
        adduserChatMessage(state, action) {
            state.chats[state.index].messages.push(action.payload);
        },
    },
});

export const { setChat, changeIndex, setMessagesAtIndex, adduserChatMessage } =
    userChatSlice.actions;
export default userChatSlice.reducer;
