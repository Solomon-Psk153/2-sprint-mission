import express from 'express';
import articleController from '../controllers/article/articleController';
import passport from '../lib/passport';

const articleRouters = express.Router();

articleRouters.get(
    '/list',
    articleController.getArticlesListHandler
);

articleRouters.get(
    '/list/:id',
    articleController.getArticleByIdHandler
);

articleRouters.post(
    '/create',
    passport.authenticate('accessToken', { session: false }),
    articleController.createArticleHandler
);

articleRouters.patch(
    '/update/:id',
    passport.authenticate('accessToken', { session: false }),
    articleController.updateArticleHandler
);

articleRouters.delete(
    '/delete/:id',
    passport.authenticate('accessToken', { session: false }),
    articleController.deleteArticleHandler
);

export default articleRouters;