import { Router } from "express";
import CartManager from "../dao/dbManagers/db.carts.js";



const cmanager = new CartManager();
const router = Router();

router.get("/", async (req, res) => {
  try {
      const carts = await cmanager.getCarts();
      return res.send({ status: "Success", payload: carts });
  } catch (error) {
      console.log(error)
  }
});
router.post("/", async (req, res) => {
  const cart = req.body;
  if (!cart) {
    return res
    .status(400)
    .send({ status: "Error", error: "Carrito no pudo ser agregado"});
  }
  const newCart = await cmanager.addCart(cart);
  return res.send({
    status: "OK",
    message: "El carrito fue agregado con exito",
    payload: newCart,
  });
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    
    const consultCart = await cmanager.getCartById(cartId);
    if (!consultCart) {
        
    return res.status(404).send({ error: "carrito no encontrado" });
    }
    
    return res.send({ status: "OK", message: "Carrito encontrado", payload: consultCart});
        
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const { quantity } = req.body;

  const newProduct = await cmanager.addProductCart(cartId, productId, quantity);

  if (!newProduct) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product could not be found" });
  }
  return res.send({
    status: "OK",
    message: "Product successfully added to the cart",
    payload: newProduct,
  });
});
  
  
  export default router;

  

