import express from 'express';
import ProductController from '../controllers/Product.controller.js';

const ProductRouter = express.Router();

ProductRouter.get('/', ProductController.getAllProducts);
ProductRouter.get('/:id', ProductController.getProductById);
ProductRouter.post('/add', ProductController.createProduct);
ProductRouter.patch('/update/:id', ProductController.updateProductById);
ProductRouter.delete('/delete/:id', ProductController.deleteProductById);

export default ProductRouter;
