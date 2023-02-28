import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

const enviar = async () => {
    
    const producto = {
        title : 'Monitor',
        description : 'Monitor Dell',
        price: 15000,
        tumbnail: 'Sin imagen',
        code: 'mn234',
        stock: 10,
    };

    let result = await manager.addProducts(producto)
    console.log(result);
}

enviar();