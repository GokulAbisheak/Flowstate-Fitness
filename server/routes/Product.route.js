import express from 'express';
import ProductController from '../controllers/Product.controller.js';

const ProductRouter = express.Router();

ProductRouter.get('/', ProductController.getAllProducts);
ProductRouter.get('/:productID', ProductController.getProductById);
ProductRouter.post('/add', ProductController.createProduct);
ProductRouter.patch('/update/:productID', ProductController.updateProductById);
ProductRouter.delete('/delete/:productID', ProductController.deleteProductById);

export default ProductRouter;
