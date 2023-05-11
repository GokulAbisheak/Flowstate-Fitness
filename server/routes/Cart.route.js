import express from 'express';
import CartController from '../controllers/Cart.controller.js';

const CartRouter = express.Router();

CartRouter.get('/', CartController.getAllCartItems);
CartRouter.get('/:productID', CartController.getCartItemById);
CartRouter.post('/add', CartController.createItems);
CartRouter.delete('/delete/:id', CartController.deleteCartItemById);


export default CartRouter;
