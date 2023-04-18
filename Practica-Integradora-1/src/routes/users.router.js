import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send({ status: "succes", payload: "OK"});
});
router.post("/", (req, res) => {});


export default router;