import SocketClient from "@/socket/socketClient";
import { adduserChatMessage } from "../userChatSlice";
import { RootState } from "@/redux/store";

export const socketMiddleware =
    (socket: SocketClient) =>
    ({ getState, dispatch }) =>
    (next: any) =>
    (action: any) => {
        switch (action.type) {
            // Connect to the socket when a user logs in
            case "socket/connect": {
                // console.log(socket.socket);
                const state = getState() as RootState;
                if (state.user.email !== null) {
                    socket.connect();
                }

                socket.on("online users", (data: any) => {
                    console.log(data);
                });

                socket.emit("connection data", {
                    email: (getState() as RootState).user.email,
                });

                socket.on("message receive", (data: any) => {
                    // console.log(data);
                    dispatch(
                        adduserChatMessage({
                            own: false,
                            message: data.message,
                            id: Date.now(),
                        })
                    );
                });

                // console.log(socket.socket);

                // Set up all the socket event handlers
                // When these events are received from the socket, they'll dispatch the proper Redux action

                // Update the online users list every time a user logs in or out
                // socket.on(
                //     "users online",
                //     ({ onlineUsers }: { onlineUsers: string[] }) => {
                //         // dispatch(addOnlineUser(onlineUsers));
                //     }
                // );

                // Append a message every time a new one comes in
                // socket.on("receive message", (message: Message) => {
                //     dispatch(addMessage(message));
                // });

                // // Remove if some user stops typing
                // socket.on("user stopped typing...", (username: string) => {
                //     dispatch(removeTypingUser(username));
                // });

                // // Add if some user starts typing
                // socket.on("user starts typing...", (username: string) => {
                //     dispatch(setTypingUser(username));
                // });

                // // Append a user every time a new one is registered
                // socket.on("new user added", (user: User) => {
                //     dispatch(addUser(user));
                // });

                // // Add the current user to the online users list
                // socket.emit("new login", payload);

                break;
            }

            case "socket/disconnect": {
                socket.disconnect();
                break;
            }

            case "messages/sendMessage": {
                socket.emit("send message", action.payload);
                break;
            }

            // Telling the sever that this user is typing...
            case "users/sendThisUserIsTyping": {
                socket.emit("typing...", action.payload);

                break;
            }

            // Telling the server that this user stopped typing..
            case "users/sendThisUserStoppedTyping": {
                socket.emit("stopped typing...", action.payload);

                return;
            }

            // Disconnect from the socket when a user logs out

            // Let the server be the source of truth for all messages; don't dispatch anything
            // case "messages/sendMessage": {
            //     socket.emit("send message", action.payload);

            //     return;
            // }
            default:
                next(action);
        }
    };
