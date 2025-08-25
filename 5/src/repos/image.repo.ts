import { createEncryptor } from "simple-encryptor";
import db from "../model/prisma";
import { ENCRYPT_KEY } from "../utils/env.util";
import base64url from "base64url";

// 이미지 제공하기
export const findImage = async (encodedEncryptedString: string) => await db.image.findUniqueOrThrow({
  where: {
    path: encodedEncryptedString
  }
});

// 이미지 하나 업로드
export const writeImageInfo = async ({ id, mimetype, originalname, filename, path, userId }: ImageUploadQueryType) => await db.image.create({
  data: {
    id,
    mimetype,
    originalname,
    filename,
    path,
    userId
  }
});

// 이미지들 업로드
export const writeImagesInfo = async (filesInfo: ImagesUploadQueryType) => await db.image.createManyAndReturn({data:filesInfo});

// 이미지 삭제
export const delere = async ({ userId, encryptedString }: DeleteImageQuerytype) => await db.image.delete({
  where: {
    userId,
    path: encryptedString
  }
});