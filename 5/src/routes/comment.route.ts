import express from 'express';
import passport from '../middlewares/passport';
import * as commentController from '../controllers/comment.controller';

const commentRouters = express.Router();

// 루트 댓글 리스트 가져오기
commentRouters.get(
    '/:kind/:id',
    commentController.getRootCommentsList
);

// 루트 댓글의 댓글 리스트 가져오기
commentRouters.get(
    '/:kind/:id/:cid',
    commentController.getCommentsOfRootComment
);

// 댓글 등록
commentRouters.post(
    '/:kind/:id{/:cid}/create',
    passport.authenticate('accessToken', { session: false }),
    commentController.createComment
);

// 댓글 수정
commentRouters.patch(
    '/:cid/update',
    passport.authenticate('accessToken', { session: false }),
    commentController.updateComment
);

// 댓글 삭제
commentRouters.delete(
    '/:cid/delete',
    passport.authenticate('accessToken', { session: false }),
    commentController.deleteComment
);


export default commentRouters;