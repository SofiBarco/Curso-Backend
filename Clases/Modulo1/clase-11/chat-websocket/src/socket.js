import { Server } from "socket.io";

const socket = {};
let messages = [];

socket.connect = function(httpServer) {
    socket.io = new Server(httpServer);

   let { io } = socket;

   io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("message", (data) => {
        messages.push(data);
        io.emit("messageLogs", messages);
    });
   });
};



export default socket;