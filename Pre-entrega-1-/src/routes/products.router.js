import ProductManager from "../ProductManager.js";
import { Router } from "express";

const router = Router();

const manager = new ProductManager();

router.get("/", async (req, res) => {
    const obtenerProductos = await manager.getProducts();
    const limit = Number.parseInt(req.query.limit)

    if(limit) {
        const resp = obtenerProductos.slice(0, limit);
        res.send(resp);
    } else {
        res.send(obtenerProductos);
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

router.get("/", async (req, res) => {
    const obtenerProductos = await manager.getProducts();
    const limit = Number.parseInt(req.query.limit)

    if(limit) {
        const resp = obtenerProductos.slice(0, limit);
        res.send(resp);
    } else {
        res.send(obtenerProductos);
    }
});

router.post("/", async (req, res) => {
    
        const product = req.body;
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
    

});
router.put("/:pid", async (req, res) => {
    try{
        const product = req.body;
        const pid = req.params.pid;

        const result = await manager.updateProduct(Number.parseInt(pid), product);
        if (!result) {
            return res.send({ error: "El producto no se pudo actualizar, el id ingresado no existe" });
        }
        res.send({ mensaje: result });
    } catch (error) {
        console.log(error);
    }   
})
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