import express from 'express';
import productController from '../controllers/product/productController';

const productRouters = express.Router();

productRouters.get(
    '/list', 
    productController.getProductListHandler
);

export default productRouters;