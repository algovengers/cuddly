import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

export interface Message {
    message: string;
    date: string;
    own: boolean;
}

export interface MessagesState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: MessagesState = {
    messages: [],
    loading: false,
    error: null,
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, { payload }: PayloadAction<Message[]>) => {
            state.messages = payload;
        },
        addMessage: (state, { payload }: PayloadAction<Message>) => {
            state.messages.push(payload);
        },
        sendMessage: (state, { payload }: PayloadAction<any>) => {
            // Placeholder for own message
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setLoadingComplete: (state) => {
            state.loading = false;
        },
    },
});

export const {
    sendMessage,
    addMessage,
    setMessages,
    setLoading,
    setLoadingComplete,
} = messagesSlice.actions;
export default messagesSlice.reducer;

export function getMessages() {
    return async (dispatch: Dispatch, getState: () => {}) => {
        dispatch(setLoading());

        try {
            const { data } = await axios("/api/messages");

            dispatch(setMessages(data.messages));
        } catch (e) {
            // Not handling errors
            console.log(e);
        } finally {
            dispatch(setLoadingComplete());
        }
    };
}
