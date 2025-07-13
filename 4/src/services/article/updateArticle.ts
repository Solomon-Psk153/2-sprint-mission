import db from "../../model/prisma";

const updateArticle = async function (
    articleUserId: string,
    articleOwnId: string, 
    title: string,
    content: string
) {
    const updatedArticle = await db.article.update({
        where:{
            id: articleOwnId,
            userId: articleUserId
        },
        data: {
            title,
            content
        }
    });

    return updatedArticle;
};

export default updateArticle;