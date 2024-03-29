import { Router } from "express";
import SessionManager from "../dao/dbManagers/db.sessions.js";
import config from "../config.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { isValidPassword } from "../utils.js";

const router = Router();
const sessionManager = new SessionManager()


router.post("/register", passport.authenticate("register", { session: false, failureRedirect: "/api/sessions/failRegister",}), async (req, res) => {
    return res.send ({ status : "success", message: "usuario registrado"});
});

router.get("/failRegister", (req, res) => {
  console.log("Failed Register");
  return res.send({ status: "error", message: "auth error"});
});

router.post("/login", async (req, res) => {
   
      const { email, password }  = req.body;
      const user = await sessionManager.getUser({ email });

      if(!user) 
        return res
        .status(400)
        .send({ status: "error", error: "Incorrect Credentials"});

      if(!isValidPassword(user, password))
        return res.status(401).send({ stautus: "error", error: "Incorrect Credentials"});
        
      const jwtUser = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        cart: user.cart,
      };

      const token = jwt.sign(jwtUser, config.jwtSecret, {expiresIn: "24h"});

      return res.cookie("jwtCookie", token, {httpOnly: true}).send({
        status: "success",
        message: "login sucessful",
      });
      
});

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}), 
async (req, res) => {
});

router.get("/githubcallback", passport.authenticate("github", {
  session: false, failureRedirect: "/login",}), async (req, res) => {
    const jwtUser= {
      name: req.user.first_name,
      email: req.user.email,
      cart: req.user.cart,
    };

    const token = jwt.sign(jwtUser, config.jwtSecret, { expiresIn: "24h"});
    res.cookie("jwtCookie", token, { httpOnly: true}).redirect("/");
  }
  );

router.post("/logout", (req, res) => {
 return res
 .clearCookie("jwtCookie")
 .send({ status: "success", message: "log out sucessful"});
});

export default router;

