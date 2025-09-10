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
    } else if (Number(q.offset) < 0 || Number(q.limit) < 0) {
      throw new BadRequestError("offset or limit must be whole number");
    }

    const userId = req.user ? req.user.id : undefined;

    const query = {
      name: q.name,
      description: q.description,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: productOrderBySelector(q.orderby),
      userId
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
    const productId = req.params.id;
    const userId = req.user ? req.user.id : undefined;

    const productByIdObj = await productService.getProductById({ userId, productId });
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
    } else if (Number(q.offset) < 0 || Number(q.limit) < 0) {
      throw new BadRequestError("offset or limit must be whole number");
    }

    const tagName: string = req.params.name;

    const userId = req.user ? req.user.id : undefined;

    const query = {
      tagName,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: productTagOrderBySelector(q.orderby),
      userId
    };

    const productsByTagObj = await productService.getProductsByTag(query);
    res.status(200).json(productsByTagObj);
  } catch (err) {
    next(err);
  }
}

// 태그 목록 조회
export const getTags = async (req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    const q = req.query;

    if (q.orderby && !["recent", "oldest"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    } else if (Number(q.offset) < 0 || Number(q.limit) < 0) {
      throw new BadRequestError("offset or limit must be whole number");
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

    const { name, description, price, tags: tagNames } = req.body;
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

    const { name, description, price, tags: tagNames } = req.body;
    const productId = req.params.id;
    const userId = req.user.id;
    const updatedProduct = await productService.updateProduct({ userId, productId, name, description, price, tagNames });

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

    const productId = req.params.id;
    const userId = req.user.id;
    const deletedProductObj = await productService.deleteProduct({ userId, productId });

    res.status(204).json(deletedProductObj);
  } catch (err) {
    next(err);
  }
}

// 상품 좋아요
export const likeProduct: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const productId = req.params.id;
    const userId = req.user.id;

    const likedProductObj = await productService.likeProduct({ userId, productId });

    res.status(200).json(likedProductObj);

  } catch (err) {
    next(err);
  }
};

// 상품 좋아요 취소
export const undoLikeProduct: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const productId = req.params.id;
    const userId = req.user.id;

    const undoLikedProductObj = await productService.undoLikeProduct({ userId, productId });

    res.status(200).json(undoLikedProductObj);

  } catch (err) {
    next(err);
  }
}

// 상품 좋아요 목록
export const getLikedProductsList = async (req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;

    const q = req.query;

    if (q.orderby && !["recent", "oldest"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    } else if (Number(q.offset) < 0 || Number(q.limit) < 0) {
      throw new BadRequestError("offset or limit must be whole number");
    }

    const query = {
      name: q.name,
      description: q.description,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: productOrderBySelector(q.orderby),
      userId
    };

    const getLikedProductsListObj = await productService.getLikedProductsList(query);
    res.status(200).json(getLikedProductsListObj);
  } catch (err) {
    next(err);
  }
}