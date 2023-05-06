import fs from 'fs';
import express from 'express';


export default class ProductManager {

    constructor() {
        this.path = './src/files/Products.json';
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
        
        socket.io.emit("products", products);
        return products;
    };

    getProductById = async (productId) => {

        if (fs.existsSync(this.path)) {
            const result = await this.getProducts();
            let productFound = result.find((product) => product.id === productId)
            if (!productFound) {
                console.log(`Product Id: ${productId} Not found`);
            } else {
                console.log(productFound);
                return productFound;

            }
        }
    }

    updateProduct = async (id, changes) => {
        try {
          const products = await this.getProducts();
          const product = await this.getProductById(id);
          const productIndex = products.findIndex((product) => product.id === id);
    
          if (changes.id) {
            throw new Error("Cannot modify id property");
          }
    
          const updatedProduct = {
            ...product,
            ...changes,
          };
    
          products.splice(productIndex, 1, updatedProduct);
    
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
          );
          return updatedProduct;
        } catch (error) {
          console.log(error);
        }
      };

    deleteProduct = async (productId) => {
        const products = await this.getProducts();

        let foundProduct = products.find((product) => product.id === productId)

        if (foundProduct) {
            const productDelete = products.filter((event) => event.id !== productId);
            await fs.promises.writeFile(this.path, JSON.stringify(productDelete, null, '\t'));
            socket.io.emit("products", productDelete);
            return 'El producto fue eliminado';
        } else {
            return `El producto no existe`;
        }
    }

}