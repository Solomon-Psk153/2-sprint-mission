import * as articleRepo from "../repos/article.repo";

// 게시글 목록 조회
export const getArticlesList = async ({ title, content, offset, limit, orderBy }: GetArticleDataType) => {

  const articlesListObj = await articleRepo.findAll({ title, content, offset, limit, orderBy });
  return articlesListObj;
};

// 게시글 상세 조회
export const getArticleById = async (articleId: string) => {
  const articleByIdObj = await articleRepo.findById(articleId);
  return articleByIdObj;
};

// 게시글 등록
export const createArticle = async ( {userId, title, content}: CreateArticleDataType ) => {
  const createdArticleObj = await articleRepo.create({userId, title, content});
  return createdArticleObj;
};

// 게시글 수정
export const updateArticle = async ({userId, articleId, title, content}: UpdateArticleDataType) => {
  const updatedArticleObj = await articleRepo.update({userId, articleId, title, content});
  return updatedArticleObj;
};

// 게시글 삭제
export const deleteArticle = async ({userId, articleId}:deleteArticleDataType) => {
  const deletedArticleObj = await articleRepo.delere({userId, articleId});
  return deletedArticleObj;
};