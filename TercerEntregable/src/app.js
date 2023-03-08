import ProductManager from "./ProductManager.js";
import express from 'express';

const manager = new ProductManager();

const serverProduct = express();

serverProduct.get("/products", async (req, res) => {
    const obtenerProductos = await manager.getProducts();
    const limit = Number.parseInt(req.query.limit)

    if(limit) {
        const resp = obtenerProductos.slice(0, limit);
        res.send(resp);
    } else {
        res.send(obtenerProductos);
    }
});

serverProduct.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    
    const consultProduct = await manager.getProductById(Number.parseInt(pid));
    if (!consultProduct) {
        
    return res.send({ error: "Producto no encontrado" });
        
    } else {
        res.send(consultProduct);
    }
        
}
);

serverProduct.listen(8080, () => {
    console.log('Servidor arriba en el puerto 8080');
});
