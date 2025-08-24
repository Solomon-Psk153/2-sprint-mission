import * as productService from "../services/product.service";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { BadRequestError, UnauthorizedError } from "../utils/error/400.error";
import { productOrderBySelector, productTagOrderBySelector } from "../utils/orderby.util";

// 상품 목록 조회
export const getProductList = async (req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    const q = req.query;

    if (q.orderby && !["recent", "oldest", "highestprice", "lowestprice"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest, highestprice, lowestprice");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    }

    const query = {
      name: q.name,
      description: q.description,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: productOrderBySelector(q.orderby)
    };

    const productsListObj = await productService.getProductsList(query);
    res.status(200).json(productsListObj);
  } catch (err) {
    next(err);
  }
}

// 상품 상세 조회
export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const productId: string = req.params.id;
    const productByIdObj = await productService.getProductById(productId);
    res.status(200).json(productByIdObj);
  } catch (err) {
    next(err);
  }
}

// 태그로 상품 목록 조회
export const getProductsByTag = async (req: Request<{ [key: string]: string; }, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {

    const q = req.query;

    if (q.orderby && !["recent", "oldest", "highestprice", "lowestprice"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest, highestprice, lowestprice");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    }

    const tagName: string = req.params.name;

    const query = {
      tagName,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: productTagOrderBySelector(q.orderby)
    };

    const productsByTagObj = await productService.getProductsByTag(query);
    res.status(200).json(productsByTagObj);
  } catch (err) {
    next(err);
  }
}

// 상품 태그 목록 조회
export const getTags = async (req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    const q = req.query;

    if (q.orderby && !["recent", "oldest", "highestprice", "lowestprice"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest, highestprice, lowestprice");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    }

    const query = {
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: productTagOrderBySelector(q.orderby)
    };

    const allTagsObj = await productService.getTags(query);
    res.status(200).json(allTagsObj);
  } catch (err) {
    next(err);
  }
}

// 상품 등록
export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const { name, description, price, tags:tagNames } = req.body;
    const userId = req.user.id;
    const createdProduct = await productService.createProduct({ userId, name, description, price, tagNames });

    res.status(201).json(createdProduct);
  } catch (err) {
    next(err);
  }
}

// 상품 수정
export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const { name, description, price, tags:tagNames } = req.body;
    const productId = req.params.id;
    const userId = req.user.id;
    const updatedProduct = await productService.updateProduct({userId, productId, name, description, price, tagNames});

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
}

// 상품 삭제
export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const productId: string = req.params.id;
    const userId = req.user.id;
    const deletedProduct = await productService.deleteProduct({userId, productId});
    
    res.status(204).json(deletedProduct);
  } catch (err) {
    next(err);
  }
}