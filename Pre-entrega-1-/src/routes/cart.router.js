import { Router } from "express";
//import CartManager from "../dao/dbManagers/db.carts.js";
import {
  getCart,
  getCartById,
  addCart,
  addProductCart,
  addProductsCart,
  deleteProduct,
  deleteProducts,
  updateProductQuantity,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getCart);
router.get("/:cid", getCartById);
router.post("/", addCart);
router.post("/:cid/product/:pid", addProductCart);
router.post("/:cid", addProductsCart);
router.put("/:cid/product/:pid", updateProductQuantity);
router.delete("/:cid/product/:pid", deleteProduct);
router.delete("/:cid", deleteProducts);



  
  export default router;

  

