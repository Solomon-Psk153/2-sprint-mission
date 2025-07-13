import { devDebug } from "../../lib/debugs";
import commentService from "../../services/comment/commentService"
import { RequestHandler } from "express";

const deleteCommentHandler: RequestHandler = async function (req, res, next){
    const commentId = req.params.cid;

    const updatedArticle = await commentService.deleteComment(commentId);

    res.status(200).json(updatedArticle);
};

export default deleteCommentHandler;