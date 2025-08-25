import express from 'express';
import * as articleController from '../controllers/article.controller';
import passport from '../middlewares/passport';

const articleRouters = express.Router();

// 게시글 목록 조회
articleRouters.get(
    '/',
    articleController.getArticlesList
);

// 게시글 상세 조회
articleRouters.get(
    '/:id',
    articleController.getArticleById
);

// 게시글 등록
articleRouters.post(
    '/create',
    passport.authenticate('accessToken', { session: false }),
    articleController.createArticle
);

// 게시글 수정
articleRouters.patch(
    '/:id/update',
    passport.authenticate('accessToken', { session: false }),
    articleController.updateArticle
);

// 게시글 삭제
articleRouters.delete(
    '/:id/delete',
    passport.authenticate('accessToken', { session: false }),
    articleController.deleteArticle
);

// 게시글 좋아요
articleRouters.post(
    '/:id/like',
    passport.authenticate('accessToken', { session: false }),
    articleController.likeArticle
);

// 게시글 좋아요 취소
articleRouters.delete(
    '/:id/like',
    passport.authenticate('accessToken', { session: false }),
    articleController.undoLikeArticle
)

// 게시글 좋아요 목록 조회
articleRouters.get(
    '/:id',
    passport.authenticate('accessToken', { session: false }),
    articleController.getLikedArticlesList
);

export default articleRouters;