import db from "../../model/prisma";

const deleteArticle = async function (
    articleUserId: string,
    articleOwnId: string
) {
    const deletedArticle = await db.article.delete({
        where:{
            id: articleOwnId,
            userId: articleUserId
        }
    });

    return deletedArticle;
};

export default deleteArticle;