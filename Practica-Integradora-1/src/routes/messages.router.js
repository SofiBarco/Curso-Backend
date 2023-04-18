import { Router } from "express";
import MessagesManager from "../messagesManager.js";

const messagesManager = new MessagesManager();

const router = Router();

router.get("/", async (req, res) => {
    const messages = await messagesManager.findAll();
    return res.send({ status: "success", payload: messages});
});
router.post("/", async (req, res) => {
   const message = req.body;
   const createdMessage = await messagesManager.create(message);
   return res.send({status : "success", payload: createdMessage});
});


export default router;