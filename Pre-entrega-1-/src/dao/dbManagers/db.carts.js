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

    getCarById = async (cid) => {
        try {
            const cart = await cartModel
            .findOne({ _id: cid}.lean())
            .populate('products.product');
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
            const updatedCart = await cartModel.updateOne(
                { _id: cartId },
                { $push: { products: [{ product: productId, quantity }]}}
            );
            return updatedCart;
        } catch (error) {
            console.log(error);
        }
    };
}