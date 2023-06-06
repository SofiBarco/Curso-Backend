import { Server } from "socket.io";
import MessageManager from "./dao/mongo/message.dao.js";

const socket = {};

const messageManager = new MessageManager();

socket.connect = (httpServer) => {
  socket.io = new Server(httpServer);

  let { io } = socket;

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

   
    socket.on("message", async (data) => {
     
      await messageManager.createMessage(data);
      let messages = await messageManager.getMessages();
      io.emit("messageLogs", messages);
    });

    socket.on("user-autenticated", async (data) => {
      let messages = await messageManager.getMessages();
      io.emit("messageLogs", messages);
      socket.broadcast.emit("user-connected", data);
    });
  });
};


export default socket;









/*import ProductManager from "./dao/dbManagers/db.products.js";

const socket ={};
socket.connect = (server) => {
    const productManager = new ProductManager();
    socket.io = new Server(server);

    socket.io.on("connection", async (socket) => {
        console.log(`Cliente conectado`);
        const products = await productManager.getProducts();

        socket.emit("products", products);
    });
};*/

