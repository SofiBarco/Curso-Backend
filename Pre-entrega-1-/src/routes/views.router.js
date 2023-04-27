import { Router } from "express";
import ProductManager from "../dao/dbManagers/db.products.js";


const router = Router();
const productManager = new ProductManager();


router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.get("/", async (req, res) => {
      const { limit = 3, page = 1, category, status, sort } = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
    } = await productManager.getProducts(page, limit, category, status, sort);

    res.render("products", {
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
    });
});

router.get("/product/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productmanager.getProductbyId(pid);
    res.render("product", {
      product,
    });
  });

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {
        products,
    });
});



export default router;