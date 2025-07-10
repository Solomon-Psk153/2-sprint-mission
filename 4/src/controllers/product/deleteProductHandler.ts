import { devDebug } from "../../lib/debugs";
import productService from "../../services/product/productService";
import { RequestHandler } from "express";

const deleteProductHandler: RequestHandler = async function (req, res, next){
    if (!req.user) {
        devDebug(req.user);
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const id:string = req.params.id;
    const deletedProduct = await productService.deleteProduct(id);
    res.status(200).json(deletedProduct);
}

export default deleteProductHandler;