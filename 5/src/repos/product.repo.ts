import db from "../utils/prisma.util";

// 상품 목록 조회(userId는 추후에 사용될 것으로 현재는 undefined 상태)
export const findAll = async ({ name, description, offset, limit, orderBy, userId }: GetProductDataType) => await db.product.findMany({
  where: {
    userId,
    name: name ? {
      contains: name,
      mode: "insensitive"
    } : undefined,
    description: description ? {
      contains: description,
      mode: "insensitive"
    } : undefined
  },

  select: {
    id: true,
    name: true,
    price: true,
    createdAt: true,
    description: true,
    tags: {
      select: {
        tag: true
      }
    }
  },

  orderBy,

  skip: offset,
  take: limit
});

// 상품 상세 조회
export const findById = async (productId: string) => await db.product.findUniqueOrThrow({
  where: { id: productId },
  select: {
    id: true,
    name: true,
    description: true,
    price: true,
    tags: {
      select: {
        tag: true
      }
    },
    // rootComments:{
    //     select:{
    //         comment: true
    //     }
    // }
  }
});

// 태그로 상품 목록 조회
export const findAllByTag = async ({ tagName, offset, limit, orderBy, userId }: GetProductDataWithTagType) => await db.tag.findMany({
  where: {
    name: tagName,
    productTags: {
      some: {
        product: {
          userId: {
            equals: userId
          }
        }
      }
    }
  },

  select: {
    productTags: {
      select: {
        product: true
      }
    }
  },

  orderBy,

  skip: offset,
  take: limit
});

// 상품 태그 목록 조회
export const findTags = async ({ offset, limit, orderBy }: GetProductTagsType) => await db.tag.findMany({
  orderBy,
  skip: offset,
  take: limit
});

// 상품 등록
export const create = async ({ userId, name, description, price, tagNames }: CreateproductDataType) => db.$transaction(async (tx) => {
  const productId = crypto.randomUUID();
  const createdProduct = await tx.product.create({
    data: {
      id: productId,
      name,
      description,
      price,
      userId,
      tags: tagNames !== undefined && tagNames.length !== 0 ? {
        create: tagNames.map(tagNameObj => ({
          id: crypto.randomUUID(),
          tag: {
            connectOrCreate: {
              where: { name: tagNameObj.name },
              create: {
                id: crypto.randomUUID(),
                name: tagNameObj.name
              }
            }
          }
        }))
      } : undefined
    },

    select: {
      id: true,
      tags: {
        select: {
          tag: true
        }
      }
    },

    // include: {
    //     tags: {
    //         include: {
    //             tag: true
    //         }
    //     }
    // }
  });
  return createdProduct;
});

// 상품 수정
export const update = async ({ userId, productId, name, description, price, tagNames }: UpdateProductDataType) => db.$transaction(async (tx) => {
  const updatedProduct = await tx.product.update({
    where: {
      userId,
      id: productId
    },
    data: {
      name,
      description,
      price
    }
  });
  const updatedTags = [];
  if (tagNames) {
    const tagNamesArr = tagNames.map(tagNameObj => tagNameObj.name)

    const deletedTags = [];

    const findOwnProductTags = await tx.productTag.findMany({
      where: { productId: productId }
    });

    for (const productTag of findOwnProductTags) {
      const deletedProductTag = await tx.productTag.delete({
        where: { id: productTag.id }
      });

      const findOneTagPoint = await tx.productTag.count({ where: { tagId: deletedProductTag.tagId } });
      if (findOneTagPoint === 0) {
        const deletedTag = await tx.tag.delete({
          where: {
            id: deletedProductTag.tagId
          }
        });

        deletedTags.push(deletedTag);
      }
    }

    const createdTags = await tx.tag.createManyAndReturn({
      data: tagNamesArr.map(name => ({
        id: crypto.randomUUID(),
        name
      })),
      skipDuplicates: true
    });

    const tagsAboutToMapping = await tx.tag.findMany({
      where: { name: { in: tagNamesArr } }
    });

    await tx.productTag.createMany({
      data: tagsAboutToMapping.map(tagObj => ({
        id: crypto.randomUUID(),
        productId: productId,
        tagId: tagObj.id
      }))
    });

    updatedTags.push({ createdTags });
    updatedTags.push({ deletedTags });

  }

  return { updatedProduct, updatedTags }

});

// 상품 삭제
export const delere = async({userId, productId}:DeleteProductDataType) => db.$transaction(async (tx) => {

  // 더 좋은 방법이 있는가?
  const commentToProduct = await tx.rootCommentToProduct.findMany({
    where: { productId }
  });

  const deletedProduct = await tx.product.delete({
    where: {
      id: productId,
      userId
    },
    include: {
      tags: true
    }
  });

  const rootCommentIds = commentToProduct.map(obj => obj.commentId);

  await tx.comment.deleteMany({
    where: {
      id: { in: rootCommentIds }
    }
  });

  // tag 삭제
  const deletedTags = [];
  for (const productTagObj of deletedProduct.tags) {
    // productTag에 태그가 남아 있으면, 삭제하지 말고 없어야 삭제할 수 있게 한다.
    const tagId = productTagObj.tagId;
    const productTagCount = await tx.productTag.count({
      where: {
        tagId
      }
    });
    if (productTagCount === 0) {
      const deletedTag = await tx.tag.delete({
        where: { id: productTagObj.tagId }
      });

      deletedTags.push(deletedTag);
    }
  }

  return { deletedProduct, deletedTags };
});

// 상품 좋아요
export const like = async({userId, productId}: LikeProductDataType) => db.$transaction(async(tx) => {
  const likedProductObj = await tx.productLike.create({
    data: {
      id: crypto.randomUUID(),
      productId,
      userId
    }
  });

  await tx.product.update({
    where:{
      id: productId
    },
    data:{
      likeCnt:{
        increment: 1
      }
    }
  });

  return likedProductObj;
});

// 상품 좋아요 취소
export const undoLike = async({userId, productId}: UndoLikeProductDataType) => db.$transaction(async(tx) => {
  const undoLikeProductObj = await tx.productLike.delete({
    where:{
      productUser:{
        productId,
        userId
      }
    }
  });

  await tx.product.update({
    where:{
      id: productId
    },

    data:{
      likeCnt:{
        decrement:1
      }
    }
  });

  return undoLikeProductObj;
});

// 상품 좋아요 목록
export const findAllByLike = async({name, description, offset, limit, orderBy, userId}: GetLikedProductDataType) => await db.product.findMany({
  where: {
    userId,
    name: name ? {
      contains: name,
      mode: "insensitive"
    } : undefined,
    description: description ? {
      contains: description,
      mode: "insensitive"
    } : undefined
  },

  select:{
    productLikes:{
      where:{
        userId
      }
    }
  },

  orderBy,

  skip: offset,
  take: limit
});
