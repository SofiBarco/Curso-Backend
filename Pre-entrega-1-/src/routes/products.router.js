import ProductManager from "../dao/dbManagers/db.products.js";
import { Router } from "express";
import { uploader } from "../utils.js";



const router = Router();

const manager = new ProductManager();

router.get("/", async (req, res) => {
     const options = {
        query: {},
        pagination: {
            limit: req.query.limit ?? 3,
            page: req.query.page ?? 1,
            sort: {},
        },
     };

     if  (req.query.category) {
        options.query.category = req.query.category;
     }

     if (req.query.status) {
        options.query.status = req.query.status;
     }

     if (req.query.sort) {
        options.query.sort = req.query.sort;
     }

     const {
        docs: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasNextPage,
        hasPrevPage,
       
     } = await manager.getPaginationProd(options);

     const link = "/products?page=";

     const prevLink = hasPrevPage ? link + prevPage: link + page;
     const nextLink = hasNextPage ? link + nextPage: link + page;

     return res.send({
        status: "Success",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasNextPage,
        hasPrevPage,
        prevLink,
        nextLink,
     });
    
});

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    
    const consultProduct = await manager.getProductById(Number.parseInt(pid));
    if (!consultProduct) {
        
    return res.send({ error: "Producto no encontrado" });
        
    } else {
        res.send(consultProduct);
    }
        
});



router.post("/", uploader.array("thumbnails", 6), async (req, res) => {
    try {
      const product = req.body;
      const files = req.files;
        
      if (!product) {
        return res.status(400).send({
            status:"Error",
            error:"El producto no pudo ser agregado",
        });
      }

      product.thumbnails = [];
  
      if (files) {
        console.log(files);
        files.forEach((file) => {
          const imgUrl = `http://localhost:8080/images/${file.filename}`;
          product.thumbnails.push(imgUrl);
        });
      }
  
      const createProduct = await manager.addProducts(product);
  
      if (!createProduct) {
        return res.status(400).send({
          status: "error",
          error: "Producto ya existe",
        });
      }
  
      return res.send({ status: "success", payload: createProduct });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        error: "Error",
      });
    }
  });

router.put("/:pid", async (req, res) => {
    
       const productId = req.params.pid;
        const changes = req.body;
  
    const productToUpdate = await manager.updateProduct(productId, changes);

    if(!productToUpdate) {
        return res.status(404).send({status: "Error", error:"Producto no encontrado"});
    }
    return res.send({
        status: 'OK',
        message: 'Producto actualizado',
    });
      
  });
router.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        let result = await manager.deleteProduct(id);

        if (!result) {
            return res.status(404).send({status:"Error", error:'El producto no existe'});
        }
        return res.send({
            status: 'OK',
            message: 'Producto eliminado',
    });
        } catch (error) {
        console.log(error);
    }
});

export default router;