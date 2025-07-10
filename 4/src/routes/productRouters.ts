import express from 'express';
import productController from '../controllers/product/productController';
import passport from '../lib/passport';

const productRouters = express.Router();

productRouters.get(
    '/list',
    productController.getProductListHandler
);

productRouters.get(
    '/list/:id',
    productController.getProductByIdHandler
);

productRouters.get(
    '/tags',
    productController.getTagsHandler
)

productRouters.get(
    '/tags/:name',
    productController.getProductsByTagHandler
);

productRouters.post(
    '/create',
    passport.authenticate('accessToken', { session: false }),
    productController.createProductHandler
);

productRouters.patch(
    '/update/:id',
    passport.authenticate('accessToken', { session: false }),
    productController.updateProductHandler
);

productRouters.delete(
    '/delete/:id',
    passport.authenticate('accessToken', { session: false }),
    productController.deleteProductHandler
);


export default productRouters;