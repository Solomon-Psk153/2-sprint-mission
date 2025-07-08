import productService from "../../services/product/productService";
import { RequestHandler } from "express";
import { query } from "../../types/query";

const getProductListHandler: RequestHandler = async function (req, res, next){
    const query:query = req.query;
    const productsList = await productService.getProductsList(query);
    res.status(200).json(productsList);
}

export default getProductListHandler;