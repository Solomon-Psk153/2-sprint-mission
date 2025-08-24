import express from 'express';
import * as productController from '../controllers/product.controller';
import passport from '../middlewares/passport';

const productRouters = express.Router();

// 상품 목록 조회
productRouters.get(
    '/',
    productController.getProductList
);

// 상품 상세 조회
productRouters.get(
    '/:id',
    productController.getProductById
);

// 태그로 상품 목록 조회
productRouters.get(
    '/:name',
    productController.getProductsByTag
);

// 상품 태그 목록 조회
productRouters.get(
    '/tags',
    productController.getTags
);

// 상품 등록
productRouters.post(
    '/create',
    passport.authenticate('accessToken', { session: false }),
    productController.createProduct
);

// 상품 수정
productRouters.patch(
    '/:id/update',
    passport.authenticate('accessToken', { session: false }),
    productController.updateProduct
);

// 상품 삭제
productRouters.delete(
    '/:id/delete',
    passport.authenticate('accessToken', { session: false }),
    productController.deleteProduct
);


export default productRouters;