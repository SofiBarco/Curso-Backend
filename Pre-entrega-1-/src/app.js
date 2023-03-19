import express from 'express';
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";



const serverProduct = express();

serverProduct.use(express.json());
serverProduct.use(express.urlencoded({ extended: true }));

serverProduct.use("/api/products", productsRouter);
serverProduct.use("/api/carts",cartRouter);



serverProduct.listen(8080, () => {
    console.log("Listening on port 8080");
  });