import cartModel from "../models/cart.model.js";



export default class CartManager {
    constructor() {}

    getCart = async () => {
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            console.log(error);
        }
    };

    getCartById = async (cid) => {
        try {
            const cart = await cartModel
            .findOne({ _id: cid})
            .populate('products.product')
            .lean();
            return cart;
        } catch (error) {
            console.log(error);
        }
    };

    addCart = async (cart) => {
        try {
            const createdCart = cartModel.create(cart);
            return createdCart;
        } catch (error) {
            console.log(error);
        }
    };

    addProductCart = async (cartId, productId, quantity) => {
        try {
            const existProduct = await cartModel.findOne({
                products: { $elemMatch: {product: productId}},
            });
            if(!existProduct) {
            const updatedCart = await cartModel.updateOne(
                { _id: cartId },
                { $push: { products: [{ product: productId, quantity }]}}
            );
            return updatedCart;
            }

            const updatedCart = await cartModel.updateOne(
                {_id: cartId},
                {$inc: {"products.$[elem].quantity": quantity}},
                {arrayFilters: [{"elem.product": productId}]}
            );
            return updatedCart
        } catch (error) {
            console.log(error);
        }
    };

    addProductsCart = async (cartId, products) => {
        try {
            const updatedCart = await cartModel.updateOne(
                {_id: cartId},
                {$set: {products}}
            );
            return updatedCart;
        } catch (error) {
            console.log(error);
        }
    };

    updateProductCart = async (cartId, productId, quantity) => {
        try {
          let updatedCart;
          if (isNaN(quantity) || quantity < 0) {
            updatedCart = await cartModel.updateOne(
              { _id: cartId, "products.productId": productId },
              { "products.$.quantity": 1 }
            );
          } else {
            updatedCart = await cartModel.updateOne(
              { _id: cartId, "products.productId": productId },
              { "products.$.quantity": quantity })
          }
    
          return updatedCart;
        } catch (error) {
          console.log(error);
        }
      };

    deleteProductCart = async (cartId, productId) => {
        try {
            const updatedCart = await cartModel.updateOne(
                {_id: cartId},
                {$pull: {products: {product: productId}}}
            );
            return updatedCart;
        } catch (error) {
            console.log(error);
        }
    };

    deleteCart = async (cartId) => {
        try {
          const cart = await cartModel.findOne({ _id: cartId })
          console.log(cart.products);
          const cartDeleted = await cartModel.updateOne({ _id: cartId }, { products: [] });
          return cartDeleted
        } catch (error) {
          console.log(error)
        }
      };

}