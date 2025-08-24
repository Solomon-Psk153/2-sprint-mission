import { createEncryptor } from "simple-encryptor";
import db from "../model/prisma";
import { ENCRYPT_KEY } from "../utils/env.util";
import base64url from "base64url";

// 이미지 제공하기
export const findImage = async(encodedEncryptedString: string) => await db.image.findUniqueOrThrow({
  where: {
    path: encodedEncryptedString
  }
});

// 이미지 하나 업로드
export const writeImageInfo = async({userId, file}: ImageUploadQueryType) => db.$transaction(async (tx) => {

  const encryptor = createEncryptor(ENCRYPT_KEY);

  const {
    mimetype,
    originalname,
    filename,
    path
  } = file;

  const createdFiles = await tx.image.create({
    data: {
      id: crypto.randomUUID(),
      mimetype,
      originalname,
      filename,
      path: base64url.encode(encryptor.encrypt(path)),
      userId
    }
  })

  return createdFiles;
});

// 이미지들 업로드
export const writeImagesInfo = async({userId, files}: ImagesUploadQueryType) => db.$transaction(async (tx) => {
  const createdFiles = [];
  const encryptor = createEncryptor(ENCRYPT_KEY);

  for (const file of files) {
    const {
      mimetype,
      originalname,
      filename,
      path
    } = file;

    createdFiles.push(
      {
        [filename]: await tx.image.create({
          data: {
            id: crypto.randomUUID(),
            mimetype,
            originalname,
            filename,
            path: base64url.encode(encryptor.encrypt(path)),
            userId
          }
        })
      }
    );
  }

  return createdFiles;
});

// 이미지 삭제
export const delere = async({userId, encryptedString}: DeleteImageQuerytype) => await db.image.delete({
  where: {
    userId,
    path: encryptedString
  }
});