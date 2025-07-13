import { v4 as uuidv4 } from "uuid";
import db from "../../model/prisma";
import { devDebug } from "../../lib/debugs";

const createComment = async function (
    whichOne: whereToLeaveComment,
    whichId: string,
    content: string,
    commentId: string | null,
    title?: string,
) {
    return db.$transaction(async (tx) => {

        let parentId: null | string = null;
        if (commentId != null) {
            const replyComment = await tx.comment.findUniqueOrThrow({
                where: {
                    id: commentId
                }
            });

            // 대댓글 달려는 댓글의 부모가 누구인가?
            parentId = replyComment.parentId;

            // 최상위(null) 라면, 나의 부모는 이제부터 최상위 댓글이며, 최상위가 아니라면, 저장된 최상위 댓글을 가져온다.
            parentId = parentId == null ? commentId : parentId;
        }

        devDebug(whichOne);

        const createdComment = await tx.comment.create({
            data: {
                id: uuidv4(),
                ...(title !== undefined && { title }),
                content,
                ...(parentId != null && { parent:{
                    connect:{
                        id: parentId
                    }
                } }),
                ...(commentId != null && { replyId:commentId }),
                ...(parentId === null && (whichOne === 'articles' ?
                    {
                        rootCommentsOfArticle: {
                            create: {
                                articleId: whichId
                            }
                        }
                    } :
                    {
                        rootCommentsOfProduct: {
                            create: {
                                productId: whichId
                            }
                        }
                    }
                )),
            }
        });

        return createdComment;
    });
};

export default createComment;