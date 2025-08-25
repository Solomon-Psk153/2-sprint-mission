import * as productRepo from "../repos/product.repo";

// 상품 목록 조회(userId는 추후에 사용될 것으로 현재는 undefined 상태)
export const getProductsList = async ({ name, description, offset, limit, orderBy, userId }: GetProductDataType) => {
  const productsListObj = await productRepo.findAll({ name, description, offset, limit, orderBy, userId });
  return productsListObj;
};

// 상품 상세 조회
export const getProductById = async (productId: string) => {
  const productByIdObj = productRepo.findById(productId);
  return productByIdObj;
};

// 태그로 상품 목록 조회
export const getProductsByTag = async ({ tagName, offset, limit, orderBy }: GetProductDataWithTagType) => {
  const ProductsByTagObj = await productRepo.findAllByTag({ tagName, offset, limit, orderBy });
  return ProductsByTagObj;
};

// 상품 태그 목록 조회
export const getTags = async ({ offset, limit, orderBy }: GetProductTagsType) => {
  const allTagsObj = await productRepo.findTags({ offset, limit, orderBy });
  return allTagsObj;
};

// 상품 등록
export const createProduct = async ({ userId, name, description, price, tagNames }: CreateproductDataType) => {
  const createdProductObj = await productRepo.create({ userId, name, description, price, tagNames });
  return createdProductObj;
};

// 상품 수정
export const updateProduct = async ({ userId, productId, name, description, price, tagNames }: UpdateProductDataType) => {
  const updatedProductObj = await productRepo.update({ userId, productId, name, description, price, tagNames });
  return updatedProductObj;
};

// 상품 삭제
export const deleteProduct = async ({ userId, productId }: DeleteProductDataType) => {
  const deletedProductObj = await productRepo.delere({ userId, productId });
  return deletedProductObj;
};

// 상품 좋아요
export const likeProduct = async({ userId, productId }: LikeProductDataType) => {
  const likedProductObj = await productRepo.like({userId, productId});
  return likedProductObj;
};

// 상품 좋아요 취소
export const undoLikeProduct = async({ userId, productId }: UndoLikeProductDataType) => {
  const undoLikedProductObj = await productRepo.undoLike({userId, productId});
  return undoLikedProductObj;
};

// 상품 좋아요 목록
export const getLikedProductsList = async({name, description, offset, limit, orderBy, userId}: GetLikedProductDataType) => {
  const getLikedProductsListObj = await productRepo.findAllByLike({name, description, offset, limit, orderBy, userId});
  return getLikedProductsListObj;
}