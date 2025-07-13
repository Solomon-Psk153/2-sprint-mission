import { devDebug } from "../../lib/debugs";
import commentService from "../../services/comment/commentService"
import { RequestHandler } from "express";

const updateCommentHandler: RequestHandler = async function (req, res, next){
    // const kind = req.params.kind as whereToLeaveComment;
    const commentId = req.params.cid;
    // const whichId = req.params.id;
    
    const {title, content}:commentReqBody = req.body;
    const updatedArticle = await commentService.updateComment(commentId, content, title);

    res.status(200).json(updatedArticle);
};

export default updateCommentHandler;