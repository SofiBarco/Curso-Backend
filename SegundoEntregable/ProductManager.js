import fs from 'fs';

export default class ProductManager {

    constructor () {
        this.path = './files/Productos.json';
        this.products = [];
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);
            console.log(result);
            return result;
        } else {
            return [];
        }
    };

    addProducts = async (product) => {
        const products = await this.getProducts();
        if (products.length === 0) {
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1;
        }
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return product;
    };

    getProductById = async (productId) => {

    if (fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const result = JSON.parse(data);
        let productFound = result.findIndex((product) => product.id === productId)
        if (productFound === -1) {
            console.log(`Product Id: ${productId} Not found`);
    }   else{
            console.log(`Product Id: ${productId} exists`);
        }
    }
    }
}

const productManager = new ProductManager

productManager.getProductById(1);
productManager.getProductById(4);
productManager.getProducts();



