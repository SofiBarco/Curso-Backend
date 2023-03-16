import CartManager from "../CartManager.js";
import { Router } from "express";

const router = Router();

const cmanager = new CartManager();

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    
    const consultCart = await cmanager.getCartById(Number.parseInt(cid));
    if (!consultCart) {
        
    return res.send({ error: "Producto no encontrado" });
        
    } else {
        res.send(consultCart);
    }
        
});

router.post("/", async (req, res) => {
    try {

        await cmanager.createCart();
        return res.status(201).send({
            status: "success",
            message: {
                success: "Cart creado con exito",
            },
        });
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body
        const valorCarrito = Object.values(quantity);
        const cantidad = valorCarrito[0]
        console.log(cantidad)
      
        let cart= await cmanager.addProductCart(cartId,productId,cantidad);
        if(typeof(cart) === "string"){
            return res.status(400).send({ status: "error", message: cart });
        }
        return res.status(201).send({
            status: "success",
            message: {
                success: `Product agregado con exito`,
            },
        });
    } catch (error) {
        console.log(error)
    }
})
export default router;