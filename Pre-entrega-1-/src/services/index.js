import ProductsService from "./product.service.js";
import CartsService from "./cart.service.js";
import UsersService from "./users.service.js";

export const productsService = new ProductsService();
export const cartsService = new CartsService();
export const usersService = new UsersService();