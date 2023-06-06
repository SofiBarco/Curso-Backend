import { cartsRepository } from "../repositories/index.js";

export default class CartsService {
  getCarts = async () => {
    try {
      const carts = await cartsRepository.getCarts();
      return carts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await cartsRepository.getCartById(id);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  addCart = async (cart) => {
    try {
      const result = await cartsRepository.addCart(cart);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  addProductCart = async (cartId, productId, quantity) => {
    try {
      let result;
      // check if cartHasProduct
      const cartHasProduct = await cartsRepository.cartHasProduct(
        cartId,
        productId
      );

      if (cartHasProduct) {
        result = await cartsRepository.updateProductQuantity(
          cartId,
          productId,
          quantity
        );
        return result;
      }

      result = await cartsRepository.addProductCart(cartId, productId, quantity);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  addProductsCart = async (cartId, productId) => {
    try {
      const result = await cartsRepository.addProductsCart(cartId, productId);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteProductCart = async (cartId, productId) => {
    try {
      const result = await cartsRepository.deleteProductCart(cartId, productId);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  deleteAllProducts = async (cartId) => {
    try {
      const result = await cartsRepository.deleteAllProducts(cartId);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const result = await cartsRepository.updateProductQuantity(
        cartId,
        productId,
        quantity
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}