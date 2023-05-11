import Cart from '../models/Cart.model.js';
import logger from '../utilities/logger.js';
import mongoose from 'mongoose';

const CartController = {

        //Get all cart items
        getAllCartItems: async (req, res) => {
            try {
                const cart = await Cart.find();
                res.status(200).json(cart);
            } catch (error) {
                res.status(500).json({ message: error.message });
                logger.error("Error getting all cart items");
            }
        },

        //Create a new cart item
        createItems: async (req, res) => {
            try {
    
                logger.info(req.body)
                const { productID, productName, productPrice, numberOfUnits } = req.body;
    
                const cart = new Cart({
    
                    productID, 
                    productName,
                    productPrice, 
                    numberOfUnits,
    
                });
                await cart.save();
                res.status(201).json(cart);
                logger.info("Cart create successful");
            } catch (error) {
                res.status(400).json({ message: error.message });
                logger.error("Cart create failed");
            }
        },

    //Get cart items by id
    getCartItemById: async (req, res) => {

        const cartId = req.params.cartId;
        
        try {
            //const cart = await Cart.findOne({productID : req.params.productID});
            const cart = await Cart.findOne({ _id: cartId });
            if (!cart) {
                logger.error("Cart " + req.params.productID + " not found");
                return res.status(404).json({ message: 'Cart not found' });
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting cart " + req.params.productID);
        }
    },

    deleteCartItemById: async (req, res) => {
        
        const cartId = req.params.cartId;
            
        try {
            const cart = await Cart.findOneAndDelete({ cartId });
            if (!cart) {
                logger.error(`Cart item not found`);
                return res.status(404).json({ message: 'Cart item not found' });
            }
            logger.info(`Cart item deleted successfully`);
            res.status(200).json({ message: 'Cart item deleted' });
        } catch (error) {
            logger.error(`Error deleting cart item : ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

}

export default CartController;