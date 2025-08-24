import { RequestHandler } from "express";
import * as imageService from "../services/image.service";
import { BadRequestError, UnauthorizedError } from "../utils/error/400.error";

// 이미지 제공하기
export const getImage: RequestHandler = async (req, res, next) => {
  try {
    const encodedEncryptedString = req.params.encodedEncryptedString;
    const image = await imageService.getImage(encodedEncryptedString);

    res.sendFile(image);
  } catch (err) {
    next(err);
  }
};

// 이미지 하나 업로드
export const uploadSingleImage: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const file = req.file;

    if (file !== undefined) {
      const userId = req.user.id;
      const ImageInfoObj = await imageService.uploadSingleImage({ userId, file });

      res.status(201).json(ImageInfoObj);
    } else {
      throw new BadRequestError("image not recieved");
    }
  } catch (err) {
    next(err);
  }
};

// 이미지들 업로드
export const uploadImages: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const files = req.files as MulterFile[];

    if (files !== undefined && files.length !== 0) {
      const userId = req.user.id;
      const ImagesInfoObj = await imageService.uploadImages({ userId, files });

      res.status(201).json(ImagesInfoObj);
    } else {
      throw new BadRequestError("image not recieved");
    }
  } catch (err) {
    next(err);
  }
};

// 이미지 삭제
export const imageDelete: RequestHandler = async (req, res, next) => {
  try {
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const query = {
      userId: req.user.id,
      encryptedString: req.params.encryptedString
    };
    
    const image = await imageService.imageDelete(query);

    res.status(200).json(image);
  } catch (err) {
    next(err);
  }
};