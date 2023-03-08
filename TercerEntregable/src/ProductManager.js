import fs from 'fs';
import express from 'express';

export default class ProductManager {

    constructor () {
        this.path = './files/Productos.json';
        this.products = [];
    }

   serverProduct = express();
   objectProduct = async () => {
    const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);
            return result;
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
        const result = await this.getProducts();
        let productFound = result.find((product) => product.id === productId)
        if (!productFound) {
            console.log(`Product Id: ${productId} Not found`);
    } else{
            console.log(productFound);
            return productFound;
        
    }
    }}

    updateProduct = async (id, title, description, price, tumbnail, code, stock) => {
        
            const products = await this.getProducts();
            const productsExist = products.findIndex((product) => product.id === id);
            if (productsExist === -1) {
                console.log(`El producto que intenta modificar, id: ${id} , no existe`);
                return [];
            } else {
                const productElect = products.filter((product) => product.id === id);

                const productChanged = {
                    title: title ?? productElect[0].title,
                    description: description ?? productElect[0].description,
                    price: price ?? productElect[0].price,
                    tumbnail: tumbnail ?? productElect[0].tumbnail,
                    code: code ?? productElect[0].code,
                    stock: stock ?? productElect[0].stock,
                    id: id
                }

                products[id -1] = productChanged;

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            } 
                
        


        }
      
            deleteProduct = async (productId) => {
                    const products = await this.getProducts();

                    let foundProduct = products.find((product) => product.id === productId)

                    if (foundProduct) {
                    const productDelete = products.filter((event) => event.id !== productId);
                        await fs.promises.writeFile(this.path, JSON.stringify(productDelete, null, '\t'));
                        return 'El producto fue eliminado';
                    } else {
                        return `El producto no existe`;
                    }
                }

    }