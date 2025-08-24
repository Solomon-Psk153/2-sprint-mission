import * as productService from "../repos/product.repo";

// 상품 목록 조회(userId는 추후에 사용될 것으로 현재는 undefined 상태)
export const getProductsList = async ({ name, description, offset, limit, orderBy, userId }: GetProductDataType) => {
  const productsListObj = await productService.findAll({ name, description, offset, limit, orderBy, userId });
  return productsListObj;
};

// 상품 상세 조회
export const getProductById = async (productId: string) => {
  const productByIdObj = productService.findById(productId);
  return productByIdObj;
};

// 태그로 상품 목록 조회
export const getProductsByTag = async ({ tagName, offset, limit, orderBy }: GetProductDataWithTagType) => {
  const ProductsByTagObj = await productService.findAllByTag({ tagName, offset, limit, orderBy });
  return ProductsByTagObj;
};

// 상품 태그 목록 조회
export const getTags = async ({ offset, limit, orderBy }: GetProductTagsType) => {
  const allTagsObj = await productService.findTags({ offset, limit, orderBy });
  return allTagsObj;
};

// 상품 등록
export const createProduct = async ({ userId, name, description, price, tagNames }: CreateproductDataType) => {
  const createdProductObj = await productService.create({ userId, name, description, price, tagNames });
  return createdProductObj;
};

// 상품 수정
export const updateProduct = async ({ userId, productId, name, description, price, tagNames }: UpdateProductDataType) => {
  const updatedProductObj = await productService.update({ userId, productId, name, description, price, tagNames });
  return updatedProductObj;
};

// 상품 삭제
export const deleteProduct = async ({ userId, productId }: DeleteProductDataType) => {
  const deletedProduct = await productService.delere({ userId, productId });
  return deletedProduct;
};