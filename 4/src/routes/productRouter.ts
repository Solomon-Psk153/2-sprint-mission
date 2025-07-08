import express from 'express';
import productController from '../controllers/product/productController';

const productRouter = express.Router();

productRouter.get('/list', productController.getProductListHandler);

export default productRouter;