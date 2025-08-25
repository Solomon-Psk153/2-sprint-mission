import db from "../utils/prisma.util";

// 게시글 목록 조회
export const findAll = async ({ title, content, offset, limit, orderBy }: GetArticleDataType) => await db.article.findMany({
  where: {
    title: title ? {
      contains: title,
      mode: "insensitive"
    } : undefined,

    content: content ? {
      contains: content,
      mode: "insensitive"
    } : undefined
  },

  select: {
    id: true,
    title: true,
    content: true,
    userId: true,
    createdAt: true,
    updatedAt: true
  },

  orderBy,

  skip: offset,
  take: limit
});

// 게시글 상세 조회
export const findById = async (articleId: string) => await db.article.findUniqueOrThrow({
  where: {
    id: articleId
  },

  select: {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    rootComments: {
      select: {
        comment: true
      }
    }
  }
});

// 게시글 등록
export const create = async ({ userId, title, content }: CreateArticleDataType) => await db.article.create({
  data: {
    id: crypto.randomUUID(),
    title,
    content,
    userId
  }
});

// 게시글 수정
export const update = async ({ userId, articleId, title, content }: UpdateArticleDataType) => await db.article.update({
  where: {
    id: articleId,
    userId
  },
  data: {
    title,
    content
  }
});

// 게시글 삭제
export const delere = async ({ userId, articleId }: DeleteArticleDataType) => db.$transaction(async (tx) => {
  const commentToArticle = await tx.rootCommentToArticle.findMany({
    where: { articleId }
  });

  const deletedArticle = await tx.article.delete({
    where: {
      id: articleId,
      userId
    }
  });

  const commentIds = commentToArticle.map(obj => obj.commentId);

  await tx.comment.deleteMany({
    where: {
      id: { in: commentIds }
    }
  });

  return deletedArticle;
});

// 게시글 좋아요
export const like = async ({ userId, articleId }: LikeArticleDataType) => db.$transaction(async (tx) => {
  const likedArticleObj = await tx.articleLike.create({
    data: {
      id: crypto.randomUUID(),
      articleId,
      userId
    }
  });

  await tx.article.update({
    where: {
      id: articleId
    },

    data: {
      likeCnt: {
        increment: 1
      }
    }
  });

  return likedArticleObj;
});

// 게시글 좋아요 취소
export const undoLike = async ({ userId, articleId }: UndoLikeArticleDataType) => db.$transaction(async (tx) => {
  const undoLikedArticleObj = await tx.articleLike.delete({
    where: {
      articleUser: {
        articleId,
        userId
      }
    }
  });

  await tx.article.update({
    where: {
      id: articleId
    },

    data: {
      likeCnt: {
        decrement: 1
      }
    }
  });

  return undoLikedArticleObj;
});

// 게시글 좋아요 목록
export const findAllByLike = async ({ title, content, offset, limit, orderBy, userId }: GetLikedArticleDataType) => await db.article.findMany({
  where: {
    title: title ? {
      contains: title,
      mode: "insensitive"
    } : undefined,

    content: content ? {
      contains: content,
      mode: "insensitive"
    } : undefined
  },

  select:{
    articleLikes:{
      where:{
        userId
      }
    }
  },

  orderBy,

  skip: offset,
  take: limit

});

export const isLiked = async ({ userId, articleId }: LikeArticleDataType) => await db.articleLike.findUnique({
  where: {
    articleUser: {
      articleId,
      userId
    }
  }
}) !== null;