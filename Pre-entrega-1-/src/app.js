import express from 'express';
import handlebars from "express-handlebars";
import morgan from 'morgan';
import database from './db.js';
import socket  from './socket.js';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from './utils.js';





const serverProduct = express();

serverProduct.engine("handlebars", handlebars.engine());
serverProduct.set("views", `${__dirname}/views`);
serverProduct.set("view engine", "handlebars");


serverProduct.use(express.json());
serverProduct.use(express.urlencoded({ extended: false }));  
serverProduct.use(express.static(`${__dirname}/public`));
serverProduct.use(morgan('dev'));

database.connect();

serverProduct.use("/api/products", productsRouter);
serverProduct.use("/api/carts",cartRouter);
serverProduct.use("/", viewsRouter);


const httpServer = serverProduct.listen(8080, (req, res) => {
    console.log("Listening on port 8080");
  });

socket.connect(httpServer);
