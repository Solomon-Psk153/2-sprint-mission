import db from "../../model/prisma";
import { v4 as uuidv4 } from "uuid";

const createArticle = async function (
    userId: string,
    title: string,
    content: string
) {
    const createdArticle = await db.article.create({
        data: {
            id: uuidv4(),
            title,
            content,
            userId
        }
    });

    return createdArticle;
};

export default createArticle;