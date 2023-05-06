import { Router } from "express";
import SessionManager from "../dao/dbManagers/db.sessions.js";
import CartManager from "../dao/dbManagers/db.carts.js"

const router = Router();
const sessionManager = new SessionManager()
const cmanager = new CartManager();


router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;
        
       const userExists = await sessionManager.getUser({email});
       if(userExists) {
        return  res
        .status (400)
        .send({ status: "error", error: "user exists"});
       }
        
       const cart = await cmanager.addCart({});

       const user = {
        first_name, 
        last_name, 
        email, 
        age, 
        password,
        role: role ?? "user",
        cart: cart._id, 
       };

       await sessionManager.register(user);
       return res.send({ status:"Success", message: "user registered ok"});
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password }  = req.body;
      const user = await sessionManager.getUser({ email, password });

      if(!user) {
        return res
        .status(400)
        .send({ status: "error", error: "Incorrect Credentials"});
      }

      req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age, 
        role: user.role,
        cart: user.cart,
      };

        res.send({
        status: "Success",
        message: "Logged In",
        payload: req.session.user,
         });
    } catch (error) {
        console.log(error);
    }
});

router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error)
    return res.send({ status: "Success", message: "Logout Successful"});
    return res.send({ status: "error", message: "error"});
  });
});

export default router;

