import fs from "fs";
import __dirname from "./utils.js";

export default class MessagesManager {
    constructor() {
        this.path = `${__dirname}/files/Message.json`;
    }

    findAll = async () => {
            try {
                if (fs.existsSync(this.path)) {
               const messagesString = await fs.promises.readFile(this.path, "utf-8");
               const messages = JSON.parse(messagesString);
               return messages; 
            } else {
                return [];
            }
            } catch (error) {
                console.log(error);
            }
            
        };

    create = async (message) => {
        try {
            const messages = await this.findAll();
            messages.push(message);
            await fs.promises.writeFile(this.path, JSON.stringify(messages, null, "\t")); 
        } catch (error) {
            console.log(error);
        }
    }
}