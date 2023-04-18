import fs from 'fs';
import ProductManager from "./ProductManager.js";
import __dirname from '../../utils.js';

const productmanager = new ProductManager();

export default class CartManager {

    constructor() {
        this.path = `${__dirname}/files/Carts.json`;
        
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
    
    getCartById = async (id) => {
      try {
        const result = await this.getCart();
          const cartFound = result.find((cartFound) => cartFound.id === id);
          if (!cartFound)  throw new Error("cart was not found");                
              return cartFound;
      } catch (error) {
        console.log(error);
      }
    };
   
    addCart = async (cart) => {
        try {
          const carts = await this.getCart();
        cart = {
          id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
          products: [],
        };
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return cart;
        } catch (error) {
          console.log(error);
        }      
    };

    
      addProductCart = async (cartId, productId, quantity) => {
              try {
              const carts = await this.getCart();
              const cartIndex = carts.findIndex((cart) => cart.id === cartId);
              const cart = await this.getCartById(cartId);
              const product = await productmanager.getProductById(productId);

              if (!product || !cart) {
                throw new Error('El carrito/producto no existen');                
              }
              const { products } = cart;

              const productIndex = products.findIndex(
                   (product) => product.productId === productId
               );

              const cartProduct = {
                  productId,
                  quantity,
                };

              if (productIndex === -1) {
                products.push(cartProduct);
              } else {
                products[productIndex].quantity += quantity;
              }

              carts.splice(cartIndex, 1, cart);

              await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
              return cart;
              } catch (error) {
                console.log(error);
              }        
            };
             
}