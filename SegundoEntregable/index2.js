import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

const enviar = async () => {

    await manager.getProducts();

    const producto = {
        title : 'Monitor',
        description : 'Monitor Dell',
        price: 15000,
        tumbnail: 'Sin imagen',
        code: 'mn234',
        stock: 10,
    };

    const product2 = {
        title : 'CPU',
        description : 'Dell',
        price: 30000,
        tumbnail: 'Sin imagen',
        code: 'cp27',
        stock: 6,
    }

    let result = await manager.addProducts(producto)
    console.log(result);

    await manager.addProducts(product2)
    console.log(product2);

    let productbyId = await manager.getProductById(2);
    console.log(productbyId);

    let productbyId2 = await manager.getProductById(9);
    console.log(productbyId2);


    let newChange = await manager.updateProduct(2, 'Teclado');
    console.log(newChange);

    let productEliminado = await manager.deleteProduct(1);
    console.log(productEliminado);
}

enviar();