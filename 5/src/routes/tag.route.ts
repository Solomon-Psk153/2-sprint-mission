import express from 'express';
import * as productController from '../controllers/product.controller';

const tagRouters = express.Router();
tagRouters.get(
    '/',
    productController.getTags
)

tagRouters.get(
    '/:name',
    productController.getProductsByTag
);

export default tagRouters;