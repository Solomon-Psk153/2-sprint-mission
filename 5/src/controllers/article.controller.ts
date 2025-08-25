import * as articleService from "../services/article.service";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { articleOrderBySelector } from "../utils/orderby.util";
import { BadRequestError, UnauthorizedError } from "../utils/error/400.error";

// 게시글 목록 조회
export const getArticlesList = async (req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    const q = req.query;

    if (q.orderby && !["recent", "oldest"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    }

    const query = {
      title: q.title,
      content: q.content,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: articleOrderBySelector(q.orderby)
    };

    const articlesListObj = await articleService.getArticlesList(query);
    res.status(200).json(articlesListObj);
  } catch (err) {
    next(err);
  }
};

// 게시글 상세 조회
export const getArticleById: RequestHandler = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const articleByIdObj = await articleService.getArticleById(articleId);
    res.status(200).json(articleByIdObj);
  } catch (err) {
    next(err);
  }
};

// 게시글 등록
export const createArticle: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const { title, content }: CreateArticleReqType = req.body;
    const createdArticleObj = await articleService.createArticle({ userId, title, content });

    res.status(201).json(createdArticleObj);
  } catch (err) {
    next(err);
  }
};

// 게시글 수정
export const updateArticle: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const articleId = req.params.id;
    const { title, content }: UpdateArticleReqType = req.body;
    const updatedArticleObj = await articleService.updateArticle({ userId, articleId, title, content });

    res.status(200).json(updatedArticleObj);
  } catch (err) {
    next(err);
  }
};

// 게시글 삭제
export const deleteArticle: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const articleId = req.params.id;
    const deleteByIdObj = await articleService.deleteArticle({ userId, articleId });
    res.status(200).json(deleteByIdObj);
  } catch (err) {
    next(err);
  }
};

// 게시글 좋아요
export const likeArticle: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const articleId = req.params.id;
    const likeByIdObj = await articleService.likeArticle({ userId, articleId });

    res.status(200).json(likeByIdObj);
  } catch (err) {
    next(err);
  }
}

// 게시글 좋아요 취소
export const undoLikeArticle: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const articleId = req.params.id;
    const undoLikeByIdObj = await articleService.undoLikeArticle({ userId, articleId });

    res.status(200).json(undoLikeByIdObj);
  } catch (err) {
    next(err);
  }
};

// 게시글 좋아요 목록
export const getLikedArticlesList = async (req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;

    const q = req.query;

    if (q.orderby && !["recent", "oldest"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    }

    const query = {
      title: q.title,
      content: q.content,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: articleOrderBySelector(q.orderby),
      userId
    };

    const getLikedArticlesListObj = await articleService.getLikedArticlesList(query);

    res.status(200).json(getLikedArticlesListObj);

  } catch (err) {
    next(err);
  }
};