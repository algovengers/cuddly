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
        onlineUsers.push(socket.id);
        io.emit("users online", { onlineUsers });
        socket.on("disconnect", () => {
            console.log("disconnection.... ", socket.id);
        });
    });
    return io;
}

export { initialize_socket_server };
