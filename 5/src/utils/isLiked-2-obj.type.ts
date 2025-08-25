import * as productRepo from "../repos/product.repo";
import * as articleRepo from "../repos/article.repo";

export const isLikedProduct = async({userId, productId}: LikeProductDataType) => await productRepo.isLiked({userId, productId});

export const isLikedToArticle = async({userId, articleId}: LikeArticleDataType) => await articleRepo.isLiked({userId, articleId});