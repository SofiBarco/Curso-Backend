import { Router } from "express";
import { userModel } from "../model/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find();
       res.send({ status: "Success", payload: users }); 
    } catch (error) {
        console.log(error);
    }
  
});

router.post("/", async(req, res) => {
    try{
        const{first_name, last_name, email} = req.body;
        if(!first_name || !last_name || !email ) {
            return res
            .status(400)
            .send({status: "error", error: "missing properties"});
        }

        const user = {
            first_name,
            last_name,
            email,
        };

        const userCreated = userModel.create(user);

        return res.send({status: "succes", payload: userCreated});
    } catch (error) {
        console.log(error);
    }
});

router.put("/:uid", async(req, res) => {
    try {
        const{ uid } = req.params;
        const updatedUser = req.body;

        if(!updatedUser) {
            return res.status(400).send({status:"error", error: "missing information"});
        }

        const user = await userModel.updateOne({_id: uid}, updatedUser);

        return res.send({ status: "success", payload: user});
        } catch(error){
        console.log(error);
    }
});

router.delete("/:uid", async(req, res) => {
    const { uid } = req.params;

    const user = await userModel.deleteOne({_id: uid});

    return res.send({status: "success", payload: user});
});


export default router;