import ProductManager from "../dao/dbManagers/db.products.js";
import { Router } from "express";
import { uploader } from "../utils.js";



const router = Router();

const manager = new ProductManager();

router.get("/", async (req, res) => {
     try {
            const { limit = 3, page = 1, category = null, status = null, sort =null} = req.query
            const obtenerProductos = await manager.getProducts(page, limit, category, status, sort);
    
            if(!obtenerProductos || obtenerProductos.length === 0) {
                return res.status(404).send({error: `Productos no encontrados`});
            }
    
            if(limit) {
                const resp = obtenerProductos.slice(0, limit);
                return res.status(200).send({
                    status: "success",
                    message: { products: resp },
                });
            } else {
                return res.status(200).send({
                    status: "success",
                    message: { products: obtenerProductos },
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({error: "Error al obtener los productos"});
        }
    
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

/*router.post("/", uploader.array("thumbnails", 6), async (req, res) => {
    
        const product = req.body;

         const files = req.files;
        product.thumbnails = [];

        if(files) {
            files.forEach((file) => {
                const imageUrl = `http://localhost:8080/images/${file.filename}`;
                product.thumbnails.push(imageUrl);
            });
        }

        let result = await manager.addProducts(product);
     
        if (result===undefined || result===null) {
            return res.send({ mensaje:"error" });
        } else {
            res.send({
                mensaje: result
            })
        }
         if (result) {
             return res.send({ error: "El producto no se pudo agregar" });
        } else {
            res.send({mensaje:"Producto agregado"})
        }    
        
       
});*/

/*router.post("/", uploader.array("thumbnails"), async (req, res) => {
    const product = req.body;
    const files = req.files;

    if(!product) {
        return res.status(400).send({
            status: "Error",
            error: "Error, el producto no pudo ser agregado",
        });
    }

    product.thumbnails = [];

     if (files) {
        files.forEach((file) => {
            const imageUrl = `http://localhost:8080/images/${file.filename}`;
            product.thumbnails.push(imageUrl);
        });
     }
     await manager.addProducts(product);
     return res.send({ status: "OK", message: "Producto agregado"});   
});*/

router.post("/", uploader.array("thumbnails"), async (req, res) => {
    try {
      let product = req.body;
      const files = req.files;
  
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
router.put("/:pid", uploader.array("thumbnails"), async (req, res) => {
    try {
       const productId = req.params.pid;
    const changes = req.body;
  
    const filesToUpdate = req.files;
    if (filesToUpdate) {
      changes.thumbnails = filesToUpdate.map(
        (file) => `http://localhost:8080/images/${file.filename}`);
    }
    const updatedProduct = await manager.updateProduct(+productId, changes);
  
    if (!updatedProduct) {
      return res
        .status(404)
        .send({ status: "Error", error: "product was not found" });
    }
    return res.send({
      status: "OK",
      message: "Product succesfully updated",
      product: updatedProduct,
    }); 
    } catch (error) {
        console.log(error);
    }
    
  });
router.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        let result = await manager.deleteProduct(Number.parseInt(id));

        res.send({
            mensaje: result
        })
    } catch (error) {
        console.log(error);
    }
});

export default router;