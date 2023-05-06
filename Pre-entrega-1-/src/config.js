import dotenv from 'dotenv';
dotenv.config();

    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;
   
const config = {
    
    dbUrl: `mongodb+srv://${dbUser}:${dbPassword}@codercluster.6z3shn4.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    sessionSecret: process.env.SESSION_SECRET,
};

export default config;