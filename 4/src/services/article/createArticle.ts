import db from "../../model/prisma";
import { v4 as uuidv4 } from "uuid";

const createArticle = async function (articleUserId: string, title: string, content: string) {
    const createdArticle = await db.article.create({
        data: {
            id: uuidv4(),
            title,
            content,
            userId: articleUserId
        }
    });

    return createdArticle;
};

export default createArticle;