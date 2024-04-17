import { Socket } from "dgram";
import { addOnlineUser } from "../socketSlice";
import SocketClient from "@/socket/socketClient";

export const socketMiddleware =
    (socket: SocketClient) =>
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        switch (action.type) {
            // Connect to the socket when a user logs in
            case "socket/connect": {
                console.log(socket.socket);

                socket.connect();
                console.log(socket.socket);

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

            // Telling the sever that this user is typing...
            case "users/sendThisUserIsTyping": {
                socket.emit("typing...", payload);

                break;
            }

            // Telling the server that this user stopped typing..
            case "users/sendThisUserStoppedTyping": {
                socket.emit("stopped typing...", payload);

                return;
            }

            // Disconnect from the socket when a user logs out
            case "users/logout": {
                socket.disconnect();

                break;
            }
            // Let the server be the source of truth for all messages; don't dispatch anything
            case "messages/sendMessage": {
                socket.emit("send message", payload);

                return;
            }
            default:
                next(action);
        }
    };