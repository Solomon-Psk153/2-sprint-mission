import * as commentRepo from "../repos/comment.repo";

// 루트 댓글 리스트 가져오기
export const getRootCommentsList = async ({ whichId, kind, title, content, lastCursor, limit, orderBy }: GetRootCommentsListQueryType) => {
  const rootCommentListObj = await commentRepo.findAllRoot({ whichId, kind, title, content, lastCursor, limit, orderBy });
  return rootCommentListObj;
};

// 루트 댓글의 댓글 리스트 가져오기
export const getCommentsOfRootComment = async ({ kind, whichId, commentId, offset, limit, orderBy }: GetCommentsOfRootCommentQueryType) => {
  const commentsOfRootCommentObj = await commentRepo.findAllOfRoot({ kind, whichId, commentId, offset, limit, orderBy });
  return commentsOfRootCommentObj;
};

// 댓글 등록
export const createComment = async ({ userId, whichId, commentId, kind, title, content }: CreateCommentQueryType) => {
  const createdCommentObj = await commentRepo.create({ userId, whichId, commentId, kind, title, content });
  return createdCommentObj;
};

// 댓글 수정
export const updateComment = async function ({ userId, commentId, title, content }: UpdateCommentQueryType) {
  const updatedCommentObj = await commentRepo.update({ userId, commentId, title, content });
  return updatedCommentObj;
};

// 댓글 삭제
export const deleteComment = async ({ userId, commentId }: DeleteCommentQueryType) => {
  const deletedCommentObj = await commentRepo.delere({ userId, commentId });
  return deletedCommentObj;
};
