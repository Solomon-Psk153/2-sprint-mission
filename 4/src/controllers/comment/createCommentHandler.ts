import commentService from "../../services/comment/commentService";
import { RequestHandler } from "express";
import { devDebug } from "../../lib/debugs";

const createCommentHandler: RequestHandler = async function (req, res, next){

    const whichId = req.params.id;
    const commentId = req.params.cid;
    const kind = req.params.kind as whereToLeaveComment;

    const {title, content}:commentReqBody = req.body;
    const createdComment = await commentService.createComment(kind, whichId, content, commentId, title);

    res.status(201).json(createdComment);
};

export default createCommentHandler;