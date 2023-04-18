import mongoose from "mongoose";
import config from "./config.js";

const { dbUser, dbPassword, dbName } = config;

const database = {
    connect: async () => {
        try {
            await mongoose.connect(
                `mongodb+srv://${dbUser}:${dbPassword}@codercluster.6z3shn4.mongodb.net/${dbName}?retryWrites=true&w=majority`
                );
        } catch (error) {
            console.log(error);
        }
    },

};

export default database;