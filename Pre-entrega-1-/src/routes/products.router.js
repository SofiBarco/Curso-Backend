//import ProductManager from "../dao/dbManagers/db.products.js";
import { Router } from "express";
import { uploader } from "../utils.js";
import {
  getProducts,
  getProductById,
  addProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";



const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductById);
router.post("/", uploader.array("thumbnails", 5), addProducts);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;