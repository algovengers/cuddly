import axios from "axios";
import { Action, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { adduserChatMessage, setMessagesAtIndex } from "../userChatSlice";

export const userChatMiddleware: Middleware =
    (store: MiddlewareAPI) => (next) => async (action: Action) => {
        const userData = store.getState().user;
        const userChatData = store.getState().userChat;
        switch (action.type) {
            case "userChat/setChat":
                if (userData.email) {
                    try {
                        const response = await axios.post(
                            `${
                                import.meta.env.VITE_BACKEND_PATH
                            }/api/userchat/getchats`,
                            { userId: userData.email },
                            { withCredentials: true }
                        );
                        next({
                            type: "userChat/setChat",
                            payload: response.data,
                        });
                    } catch (error) {
                        console.error("Error fetching user chats:", error);
                    }
                }
                break;
            case "userChat/changeIndex":
                try {
                    const index = (action as any).payload.index;
                    const interData = userChatData.chats[index].users;

                    const response = await axios.post(
                        `${
                            import.meta.env.VITE_BACKEND_PATH
                        }/api/userchat/getmessages`,
                        {
                            userId1: interData[0].userId,
                            userId2: interData[1].userId,
                        },
                        { withCredentials: true }
                    );
                    // console.log(response.data.messages ); //array of id, senderId, message, timestamp
                    const newArr = response.data.messages.map((d) => {
                        let own = false;
                        if (d.senderId === userData.email) own = true;
                        return { id: d.id, message: d.message, own };
                    });

                    store.dispatch(
                        setMessagesAtIndex({ messages: newArr, index })
                    );
                } catch (error) {
                    console.error("Error fetching chat messages:", error);
                }
                next(action);
                break;
            case "userChat/sendMessage":
                try {
                    //first sending the optimistic update i wont work now like what will happen when a error occurs
                    store.dispatch(
                        adduserChatMessage({
                            own: true,
                            message: (action as any).payload,
                            id: Date.now(),
                        })
                    );

                    //then send to other user also
                    const interData =
                        userChatData.chats[userChatData.index].users;

                    const otherUser = interData.find(
                        (d) => d.userId !== userData.email
                    );
                    // console.log(otherUser);
                    store.dispatch({
                        type: "messages/sendMessage",
                        payload: {
                            message: (action as any).payload,
                            userId: otherUser.userId,
                        },
                    });

                    const response = await axios.post(
                        `${
                            import.meta.env.VITE_BACKEND_PATH
                        }/api/userchat/sendmessage`,
                        {
                            userId1: interData[0].userId,
                            userId2: interData[1].userId,
                            message: {
                                userId: userData.email,
                                message: (action as any).payload,
                            },
                        },
                        { withCredentials: true }
                    );

                    const newArr = response.data.messages.map((d) => {
                        let own = false;
                        if (d.senderId === userData.email) own = true;
                        return { id: d.id, message: d.message, own };
                    });

                    next(
                        setMessagesAtIndex({
                            messages: newArr,
                            index: userChatData.index,
                        })
                    );
                    // console.log(response);
                    // now send the optimistic update
                    // and socket emit
                } catch (error) {
                    console.log("Error adding messages:", error);
                }
                break;
            default:
                next(action);
        }
    };
