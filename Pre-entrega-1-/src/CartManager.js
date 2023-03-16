import fs from 'fs';
import express from 'express';
import ProductManager from "./ProductManager.js";

const productmanager = new ProductManager();

export default class CartManager {

    constructor() {
        this.path = './src/public/files/Carts.json';
        this.cart = [];
    }

    serverCart = express();
    objectCart = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const result = JSON.parse(data);
        return result;
    }

    getCart = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);
            console.log(result);
            return result;
        } else {
            return [];
        }
    };

    createCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const result = JSON.parse(data);
                const otroCart = { id: result.length + 1, products: [] }
                result.push(otroCart)
                await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"));
                return `El Carrito fue creado exitosamente!`;
            } else {

                const newCart = { id: this.cart.length + 1, products: [] }
                this.cart.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, "\t"));
                return `Carrito creado de nuevo`

            }
        } catch (error) {
            console.error(`Error to read the file ${this.path} ${error}`);
            return [];
        }
    }


    addCart = async (cart) => {
        const carts = await this.getCart();
        if (carts.length === 0) {
            cart.id = 1;
        } else {
            cart.id = carts[carts.length - 1].id + 1;
        }
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return cart;
    };
    addProductCart = async (cartId, productId, quantity) => {
                            
              const carts = await this.getCart();
        
              const cartIdExist = carts.findIndex((cart) => cart.id === Number.parseInt(cartId));

              const products = await productmanager.getProducts();
              const productIdExist = products.findIndex((prod) => prod.id === Number.parseInt(productId))         
              if (cartIdExist !== -1) {
                if ( productIdExist !== -1 ) {
                    return `El producto con el id ${productId} no se encuentra`
                }
                
                const productAdd = {
                    id: Number.parseInt(productId),
                    quantity: Number.parseInt(quantity)
                  };

                  const cartIdFound = carts.findIndex((cart) => cart.id === parseInt(cartId));
                  const productIdFound = carts[cartIdFound].products.findIndex((prod) => prod.id === parseInt(productId))
      
                  if (cartIdFound !== -1) {
      
                      if (productIdFound !== -1) {
                          carts[cartIdFound].products[productIdFound].quantity++;
      
                      } else {
      
                          if (isNaN(quantity) || quantity <= 0) {
                              return `The quantity does not have a valid value`;
                          }
                          carts[cartIdFound].products.push(productAdd);
      
                      }
                await fs.promises.writeFile(this.path,JSON.stringify(carts, null, "\t"));
                return carts;
              } else {
                return ` Carrito con ese ID  NO EXISTE`;
              }}
           
            
    }

    getCartById = async (cartId) => {

        if (fs.existsSync(this.path)) {
            const result = await this.getCart();
            let cartFound = result.find((cart) => cart.id === cartId)
            if (!cartFound) {
                console.log(`Product Id: ${cartId} Not found`);
            } else {
                console.log(cartFound);
                return cartFound;

            }
        }
    }

}