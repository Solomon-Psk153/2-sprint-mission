import db from "../utils/prisma.util";

// 루트 댓글 리스트 가져오기
export const findAllRoot = async ({ whichId, kind, title, content, lastCursor, limit, orderBy }: GetRootCommentsListQueryType) => db.$transaction(async (tx) => {

  const where = {
    articleId: kind === 'articles' ? whichId : undefined,
    productId: kind === 'products' ? whichId : undefined,
    comment: {
      is: {
        ...(title && {
          title: {
            contains: title,
            mode: "insensitive" as QueryMode,
          }
        }),
        ...(content && {
          content: {
            contains: content,
            mode: "insensitive" as QueryMode,
          }
        })
      }
    }
  };

  const restCondition = {
    take: limit,
    orderBy: {
      comment: {
        ...orderBy
      }
    },

    include: {
      comment: true
    }
  };

  const articleFindManyObj = {
    where,
    ...(lastCursor !== undefined && {
      skip: 1,
      cursor: {
        articleId_commentId: {
          articleId: whichId,
          commentId: lastCursor
        }
      }
    }),
    ...restCondition,
  };

  const productFindManyObj = {
    where,
    ...(lastCursor !== undefined && {
      skip: 1,
      cursor: {
        productId_commentId: {
          productId: whichId,
          commentId: lastCursor
        }
      }
    }),
    ...restCondition,
  };

  let rootCommentList;
  switch (kind) {
    case "articles":
      rootCommentList = await tx.rootCommentToArticle.findMany(articleFindManyObj);
      break;
    case "products":
      rootCommentList = await tx.rootCommentToProduct.findMany(productFindManyObj);
      break;
  }

  const metadata: metadataType = {
    lastCursor: null,
    hasNextPage: false,
  }

  if (rootCommentList.length === 0) {
    return { rootCommentList, metadata };
  }

  const lastCursorResult = rootCommentList[rootCommentList.length - 1];
  const lastCursorId = lastCursorResult.commentId;

  let nextPage;

  switch (kind) {
    case "articles":
      nextPage = await tx.rootCommentToArticle.findMany({
        where,
        skip: 1,
        cursor: {
          articleId_commentId: {
            articleId: whichId,
            commentId: lastCursorId
          }
        },
        ...restCondition
      });
      break;

    case "products":
      nextPage = await tx.rootCommentToProduct.findMany({
        where,
        skip: 1,
        cursor: {
          productId_commentId: {
            productId: whichId,
            commentId: lastCursorId
          }
        },
        ...restCondition
      });
      break;
  }

  metadata.lastCursor = lastCursorId;
  metadata.hasNextPage = nextPage.length > 0;

  return { rootCommentList, metadata }
});

// 루트 댓글의 댓글 리스트 가져오기
export const findAllOfRoot = async({ kind, whichId, commentId, offset, limit, orderBy }: GetCommentsOfRootCommentQueryType) => db.$transaction(async (tx) => {
  switch (kind) {
    case "articles":
      await tx.rootCommentToArticle.findUniqueOrThrow({
        where: {
          articleId_commentId: {
            articleId: whichId,
            commentId
          }
        }
      });
      break;
    case "products":
      await tx.rootCommentToProduct.findUniqueOrThrow({
        where: {
          productId_commentId: {
            productId: whichId,
            commentId
          }
        }
      });
      break;
  }

  const commentsOfRootComment = await tx.comment.findMany({
    where: {
      id: commentId
    },

    include: {
      comments: {
        orderBy,
        skip: offset,
        take: limit
      }
    }
  });

  return commentsOfRootComment;
});

// 댓글 등록
export const create = async ({userId, whichId, commentId, kind, title, content}: CreateCommentQueryType) => db.$transaction(async (tx) => {

  let parentId: null | string = null;
  if (commentId != null) {
    const replyComment = await tx.comment.findUniqueOrThrow({
      where: {
        id: commentId
      }
    });

    // 대댓글 달려는 댓글의 부모가 누구인가?
    parentId = replyComment.parentId;

    // 최상위(null) 라면, 나의 부모는 이제부터 최상위 댓글이며, 최상위가 아니라면, 저장된 최상위 댓글을 가져온다.
    parentId = parentId == null ? commentId : parentId;
  }

  const createdComment = await tx.comment.create({
    data: {
      id: crypto.randomUUID(),
      title,
      content,
      userId,
      parent: parentId ? {
        connect: {
          id: parentId
        }
      } : undefined, 
      replyId: commentId ? commentId : undefined,
      rootCommentsOfArticle: kind === 'articles' ? {
        create: {
          articleId: whichId
        }
      } : undefined,

      rootCommentsOfProduct: kind === 'products' ? {
        create: {
          productId: whichId
        }
      } : undefined
    }
  });

  return createdComment;
});

// 댓글 수정
export const update = async({userId, commentId, title, content}: UpdateCommentQueryType) => db.$transaction(async (tx) => {

  const updatedComment = await tx.comment.update({
    where: {
      id: commentId,
      userId
    },
    data: {
      title,
      content
    }
  });

  return updatedComment;
});

// 댓글 삭제
export const delere = async ({ userId, commentId }: DeleteCommentQueryType) => db.$transaction(async (tx) => {

  const deletedComment = await tx.comment.delete({
    where: {
      id: commentId,
      userId
    }
  });

  await tx.comment.updateMany({
    where: {
      replyId: deletedComment.id
    },

    data: {
      replyId: deletedComment.parentId
    }
  });

  return deletedComment;
});