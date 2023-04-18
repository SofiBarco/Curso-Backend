import express from "express";
import usersRouter from './routes/users.router.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(express.json());



app.listen(8080, () => {
    console.log(('Listening on port 8080'));
});

mongoose.connect(
    "mongodb+srv://sofibarco:BWT2M3UfGPHRvECF@codercluster.6z3shn4.mongodb.net/?retryWrites=true&w=majority"
);
app.use('/api/users', usersRouter);