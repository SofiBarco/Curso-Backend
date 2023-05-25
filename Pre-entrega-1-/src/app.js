import express from 'express';
import handlebars from "express-handlebars";
import morgan from 'morgan';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import database from './db.js';
import socket  from './socket.js';
import passport from "passport";
import initializePassport from "./auth/passport.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from './utils.js';
import config from './config.js';





const serverProduct = express();

serverProduct.engine("handlebars", handlebars.engine());
serverProduct.set("views", `${__dirname}/views`);
serverProduct.set("view engine", "handlebars");


serverProduct.use(express.json());
serverProduct.use(express.urlencoded({ extended: true }));  
serverProduct.use("/", express.static(`${__dirname}/public`));
serverProduct.use(morgan('dev'));
serverProduct.use(cookieParser());
initializePassport();
serverProduct.use(passport.initialize());
  

database.connect();

serverProduct.use("/api/products", productsRouter);
serverProduct.use("/api/carts",cartRouter);
serverProduct.use("/", viewsRouter);
serverProduct.use("/api/sessions", sessionsRouter);

const httpServer = serverProduct.listen(8080, (req, res) => {
    console.log("Listening on port 8080");
  });

socket.connect(httpServer);
