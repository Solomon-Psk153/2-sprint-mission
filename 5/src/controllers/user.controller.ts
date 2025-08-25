import * as uesrService from "../services/user.service";
import * as productService from "../services/product.service";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { BadRequestError, UnauthorizedError } from "../utils/error/400.error";
import { productOrderBySelector } from "../utils/orderby.util";

// 유저 정보 조회
export const getUserInfo: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const userInfo = await uesrService.getUserInfo(userId);

    res.status(200).json(userInfo);
  } catch (err) {
    next(err);
  }
};

// 유저 상품 목록 조회
export const getUserProductList = async (req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const q = req.query;

    if (q.orderby && !["recent", "oldest", "highestprice", "lowestprice"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest, highestprice, lowestprice");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    }

    const userId = req.user.id;

    const query = {
      name: q.name,
      description: q.description,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: productOrderBySelector(q.orderby),
      userId
    };

    const userProductsList = await productService.getProductsList(query);

    res.status(200).json(userProductsList);
  } catch (err) {
    next(err);
  }
};

// 유저 비밀번호 수정
export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const { newPassword }: UserInfoType = req.body;

    const status = await uesrService.updatePassword({userId, newPassword});

    res.status(200).json(status);
  } catch (err) {
    next(err);
  }
};

// 유저 정보 수정
export const updateUserInfo: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const userId = req.user.id;
    const { nickname, email }: UserInfoType = req.body;
    const updatedUserInfoObj = await uesrService.updateUserInfo({userId, nickname, email});

    res.status(200).json(updatedUserInfoObj);
  } catch (err) {
    next(err);
  }
};