type CreateproductDataType = {
  userId: string;
  name: string;
  description: string;
  price: number;
  tagNames?: { name: string }[]
};

type GetProductDataType = Modify<PagenationType, {
  name: string;
  description: string;
  orderBy: CreatedAtType | PriceType;
  userId?: string;
}>;

type GetProductDataWithTagType = Modify<Omit<GetProductDataType, "name" | "description">, {
  tagName: string;
  orderBy: CreatedAtType;
}>;

type GetProductTagsType = Omit<GetProductDataWithTagType, "tagName">;

type UpdateProductDataType = CreateproductDataType & {
  productId: string;
};

type DeleteProductDataType = {
  userId: string;
  productId: string;
};

type LikeProductDataType = DeleteProductDataType;

type UndoLikeProductDataType = LikeProductDataType;

type GetLikedProductDataType = Required<GetProductDataType>