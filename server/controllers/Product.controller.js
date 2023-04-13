import Product from '../models/Product.model.js';
import logger from '../utilities/logger.js';

const ProductController = {
    
    //Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting all products");
        }
    },

    //Get products by id
    getProductById: async (req, res) => {
        try {
            const product = await Product.findOne({productID : req.params.productID});
            if (!product) {
                logger.error("Product " + req.params.productID + " not found");
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting product " + req.params.productID);
        }
    },

    //Create a new product
    createProduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
            logger.info("Product create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Product create failed");
        }
    },

    //Update a product by id
    updateProductById: async (req, res) => {
        try {
            const product = await Product.findOneAndUpdate(
                {productID : req.params.productID},
                req.body,
                { new: true }
            );
            logger.info("Product " + req.params.productID + " update successful");
            if (!product) {
                logger.error("Product " + req.params.productID + " not found");
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Product " + req.params.productID + " update unsuccessful");
        }
    },

    //Delete a product by id
    deleteProductById: async (req, res) => {
        try {
            const product = await Product.findOneAndDelete(req.params.productID);
            if (!product) {
                logger.error("Product " + req.params.productID + " not found");
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted' });
            logger.info("Product " + req.params.productID + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("Product " + req.params.productID + " deleted successfully");
        }
    }
};

export default ProductController;
