import productService from "../../services/product/productService";
import { RequestHandler } from "express";

const getProductByIdHandler: RequestHandler = async function (req, res, next){
    const id:string = req.params.id;
    const productById = await productService.getProductById(id);
    res.status(200).json(productById);
}

export default getProductByIdHandler;