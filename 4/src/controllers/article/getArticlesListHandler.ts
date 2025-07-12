import articleService from "../../services/article/articleService";
import { RequestHandler } from "express";
import { query } from "../../types/query";

const getArticlesListHandler: RequestHandler = async function (req, res, next){
    const query:query = req.query;
    const articlesList = await articleService.getArticlesList(query);
    res.status(200).json(articlesList);
}

export default getArticlesListHandler;