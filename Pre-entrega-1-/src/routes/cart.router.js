import CartManager from "../CartManager.js";
import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const productmanager = new ProductManager();
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
});


router.post('/:cid/products/:pid', async (req, res) => {

    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    
    try {
      const updatedCart = await cmanager.addProductCart(cartId, productId, quantity);
      res.send(updatedCart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agregar producto al carrito');
    }
  });
  
  
  export default router;

  
/*router.post("/:cid/products/:pid", async (req, res) => {
     
   const cart = await cmanager.getCartById();
    await productmanager.getProductById();
  
    if (!cart) {
      return res.status(404).send({ error: "Cart not found" });
    } else {
        res.send({
            mensaje: cart
        })
  
    if (!product) {
      
      return res.status(404).send({ error: "Product not found" });
    } else {
        res.send({mensaje:"Producto agregado"})
    }}
  
  });*/
/*
router.post("/:cid/products/:pid", async (req, res) => {
    try {
      const cart = await cmanager.getCartById(req.params.cid);
      if (cart) {
       const cart = await cmanager.addProductCart(req.params.pid, req.body.quantity);
        res.send(cart);
      } else {
        res.status(404).send('Carrito no encontrado');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agregar producto al carrito');
    }
  });*/
/*router.post("/:cid/product/:pid", async (req, res) => {
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
})*/
