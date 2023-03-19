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

    /*addProductCart = async (cartId, products, quantity) => {
        const cart = await this.getCartById(cartId);
        if (!cart) {
          return `Carrito no encontrado`;
        }         
        for (let i = 0; i < products.length; i++) {
          const product = productId[i];
          const productId = product.id;
          
                    
          const existingProduct = cart.products.find((prod) => prod.id === productId);
          if (existingProduct) {
            existingProduct.quantity += quantity;
          } else {
            const foundProduct = await productmanager.getProductById(productId);
            if (!foundProduct) {
              return `Producto no encontrado`;
            }
            cart.products.push({
              id: productId,
              quantity: quantity,
            });
          }
        }
        
        await cart.save();
        return cart;
      };*/


      addProductCart = async (cartId, productId, quantity) => {
                            
              const carts = await this.getCart();
              const cartIndex = carts.findIndex((cart) => cart.id === cartId);
              const cart = await this.getCartById(cartId);
              const product = await productmanager.getProductById(productId);

              if (!product || !cart) {
                throw new Error('El carrito/producto no existen');
                
              }
              if (cartIndex >= 0) {
                // el carrito ya existe
                const existingProduct = cart.products.find(p => p.id === productId);
                if (ExistingProduct) {
                  // el producto ya existe en el carrito
                  existingProduct.quantity += quantity;
                } else {
                  // el producto no existe en el carrito
                  cart.products.push({
                    id: productId,
                    quantity: quantity
                  });
                }
              } else {
                // el carrito no existe
                const newCart = {
                  id: cartId,
                  products: [{
                    id: productId,
                    quantity: quantity
                  }]
                };
                carts.push(newCart);
              }
              
              await this.saveCarts(carts);
              return carts[cartIndex];
            } 

    /*addProductCart = async (cartId, productId, quantity) => {

        /*const cartIndex = carts.findIndex((cart) => cart.id === cartId);
        const cart = await this.getCartById(cartId);
        const products = await productmanager.getProductById(productId);
        const productIindex = products.findIndex((product) => product.productId === productId);
    
        if (productIindex >= 0) {
          const products = cart.products.find((product) => product.id === productId)
            if(products) {
                products.quantity += quantity;  
            } else {
          
          cart.products.push(
            {
            id: productId,
            quantity: quantity
          });
        }
    } else {
        return `Producto no encontrado`
    }
      };*/


    


    /*addProductCart = async (cartId, productId, quantity) => {
                            
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
           
            
    }*/

    getCartById = async (cartId) => {

        if (fs.existsSync(this.path)) {
            const result = await this.getCart();
            let cartFound = result.find((cart) => cart.id === cartId)
            if (!cartFound) {
                console.log(`Cart Id: ${cartId} Not found`);
            } else {
                console.log(cartFound);
                return cartFound;

            }
        }
    }

}