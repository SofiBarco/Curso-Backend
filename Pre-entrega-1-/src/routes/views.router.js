import { Router } from "express";
import ProductManager from "../dao/dbManagers/db.products.js";
import CartManager from "../dao/dbManagers/db.carts.js";
import { isProtected, checkLogged, checkSession } from "../middlewares/autorizacion.js";


const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/register", checkLogged, (req, res) => {
  res.render("register", {title : "Register"});
});

router.get("/login",checkSession, (req, res) => {
  res.render("login", {title : "Login"});
})

router.get("/", isProtected, async (req, res) => {
     const options = {
      query: {},
      pagination: {
        limit: req.query.limit ?? 3,
        page: req.query.page ?? 1,
        lean: true,
        sort: {},
      },
     };
     if (req.query.category) {
      options.query.category = req.query.category;
    }
  
    if (req.query.status) {
      options.query.status = req.query.status;
    }
  
    if (req.query.sort) {
      options.pagination.sort.price = req.query.sort;
    }
  
    const {
      docs: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
    } = await productManager.getPaginationProd(options);
  
    const link = "/?page=";
  
    const prevLink = hasPrevPage ? link + prevPage : link + page;
    const nextLink = hasNextPage ? link + nextPage : link + page;
  
    return res.render("home", {
      products,
      totalPages,
      page,
      hasNextPage,
      hasPrevPage,
      prevLink,
      nextLink,
      title: "Products",
      user: req.session.user,
    });
});

router.get("/product/:pid", async (req, res) => {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    res.render("product", {
      title: "Detalle Producto",
      product
    });
  });

router.get("/carts", async (req, res) => {
  const cart = await cartManager.getCartById("643b00bbcad7f717963e84f6");
  res.render("cart", {products: cart.products, title: "Carrito"});
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {
        products,
        title: "Real Time Products",
    });
});



export default router;