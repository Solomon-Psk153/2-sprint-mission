import * as commentService from "../services/comment.service";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { BadRequestError, UnauthorizedError } from "../utils/error/400.error";
import { commentOrderBySelector } from "../utils/orderby.util";

// 루트 댓글 리스트 가져오기
export const getRootCommentsList = async (req: Request<{ [key: string]: string; kind: whereToLeaveComment }, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    const q = req.query;

    if (q.orderby && !["recent", "oldest"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    }

    const query = {
      whichId: req.params.id,
      kind: req.params.kind,
      title: q.title,
      content: q.content,
      lastCursor: q.lastCursor,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: commentOrderBySelector(q.orderby)
    }

    const rootCommentsListObj = await commentService.getRootCommentsList(query);
    res.status(200).json(rootCommentsListObj);
  } catch (err) {
    next(err);
  }
}

// 루트 댓글의 댓글 리스트 가져오기
export const getCommentsOfRootComment = async (req: Request<{ [key: string]: string; kind: whereToLeaveComment }, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
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
      kind: req.params.kind,
      whichId: req.params.id,
      commentId: req.params.cid,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: commentOrderBySelector(q.orderby)
    };

    const rootCommentsList = await commentService.getCommentsOfRootComment(query);
    res.status(200).json(rootCommentsList);
  } catch (err) {
    next(err);
  }
}

// 댓글 등록
export const createComment = async (req: Request<{ [key: string]: string; kind: whereToLeaveComment }, {}, { title: CreateCommentDataType["title"], content: CreateCommentDataType["content"] }, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const { title, content } = req.body;

    const query = {
      userId: req.user.id,
      whichId: req.params.id,
      commentId: req.params.cid,
      kind: req.params.kind,
      title,
      content
    };

    const createdCommentObj = await commentService.createComment(query);

    res.status(201).json(createdCommentObj);
  } catch (err) {
    next(err);
  }
};

// 댓글 수정
export const updateComment = async (req: Request<{ [key: string]: string; kind: whereToLeaveComment }, {}, { title: CreateCommentDataType["title"], content: CreateCommentDataType["content"] }, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const { title, content } = req.body;

    const query = {
      userId: req.user.id,
      commentId: req.params.cid,
      title,
      content
    }
    const updatedArticle = await commentService.updateComment(query);

    res.status(200).json(updatedArticle);

  } catch (err) {
    next(err);
  }
};

// 댓글 삭제
export const deleteComment: RequestHandler = async function (req, res, next) {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }
    
    const query = {
      userId: req.user.id,
      commentId: req.params.cid
    };

    const deletedArticle = await commentService.deleteComment(query);
    res.status(200).json(deletedArticle);
  } catch (err) {
    next(err);
  }
};

