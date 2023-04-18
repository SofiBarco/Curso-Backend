import express from "express";
import handlebars from "express-handlebars";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import usersRouter from "./routes/users.router.js";
import messagesRouter from "./routes/messages.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

const app = express();
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

mongoose.connect(
    ``
);

app.listen(8080, () =>{
    console.log("Listening on port 8080");
});

app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);
app.use("/", viewsRouter);