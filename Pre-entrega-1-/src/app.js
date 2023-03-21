import express from 'express';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import socket  from './socket.js';
import __dirname from './utils.js';
import viewsRouter from "./routes/views.router.js";





const serverProduct = express();

serverProduct.engine("handlebars", handlebars.engine());
serverProduct.set("views", `${__dirname}/views`);
serverProduct.set("view engine", "handlebars");

serverProduct.use(express.static(`${__dirname}/public`));

serverProduct.use(express.json());
serverProduct.use(express.urlencoded({ extended: true }));

serverProduct.use("/api/products", productsRouter);
serverProduct.use("/api/carts",cartRouter);

serverProduct.use("/", viewsRouter);

const httpServer = serverProduct.listen(8080, () => {
    console.log("Listening on port 8080");
  });

socket.connect(httpServer)
  
  /*socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("message", (data) => {
      console.log(data);
    });
  });*/