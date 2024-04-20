import { Server as HttpServer } from "http";
import { Server } from "socket.io";

function initialize_socket_server(server: HttpServer) {
    const onlineUsers: any[] = [];

    const io = new Server(server, {
        cors: {
            origin: true,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(socket.id);
        socket.on("connection data", (data) => {
            onlineUsers.push({ socketId: socket.id, emailId: data.email });
            io.emit("online users", onlineUsers);
        });

        socket.on("send message", (data) => {
            const index = onlineUsers.findIndex(
                (user) => user.emailId === data.userId
            );
            if (index !== -1) {
                const socketId = onlineUsers[index].socketId;
                io.to(socketId).emit("message receive", {
                    message: data.message,
                });
            }
        });

        socket.on("disconnect", () => {
            console.log("disconnection.... ", socket.id);
            const index = onlineUsers.findIndex(
                (user) => user.socketId === socket.id
            );
            if (index !== -1) {
                onlineUsers.splice(index, 1);
            }
        });
    });
    return io;
}

export { initialize_socket_server };
