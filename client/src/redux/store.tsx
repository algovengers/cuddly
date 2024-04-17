import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import chatReducer from "./chatSlice";
import userChatReducer from "./userChatSlice";
import { userChatMiddleware } from "./middlewares/userChatMiddleware";
import SocketClient from "@/socket/socketClient";
import { socketMiddleware } from "./middlewares/socketMiddleware";

const socket = new SocketClient();

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
        userChat: userChatReducer,
    },
    middleware: (defaultMiddlewares) =>
        defaultMiddlewares().concat(
            userChatMiddleware,
            socketMiddleware(socket)
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
