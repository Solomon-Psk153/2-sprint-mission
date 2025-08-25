import * as imageRepo from "../repos/image.repo";
import { createEncryptor } from 'simple-encryptor';
import { ENCRYPT_KEY } from '../utils/env.util';
import base64url from 'base64url';

// 이미지 제공하기
export const getImage = async (encodedEncryptedString: string) => {
  const encodedEncryptedFilePath = await imageRepo.findImage(encodedEncryptedString);

  const encryptor = createEncryptor(ENCRYPT_KEY);
  const encryptedFilePath = base64url.decode(encodedEncryptedFilePath.path);

  return encryptor.decrypt(encryptedFilePath);
};

// 이미지 하나 업로드
export const uploadSingleImage = async ({ userId, file }: ImageUploadDataType) => {

  const encryptor = createEncryptor(ENCRYPT_KEY);

  const {
    mimetype,
    originalname,
    filename,
    path
  } = file;

  const query = {
    id: crypto.randomUUID(),
    mimetype,
    originalname,
    filename,
    path: base64url.encode(encryptor.encrypt(path)),
    userId
  };

  const ImageInfoObj = await imageRepo.writeImageInfo(query);
  return ImageInfoObj;
};

// 이미지들 업로드
export const uploadImages = async function ({ userId, files }: ImagesUploadDataType) {

  const filesInfo = [];
  const encryptor = createEncryptor(ENCRYPT_KEY);

  for (const file of files) {
    const {
      mimetype,
      originalname,
      filename,
      path
    } = file;

    filesInfo.push({
      id: crypto.randomUUID(),
      mimetype,
      originalname,
      filename,
      path: base64url.encode(encryptor.encrypt(path)),
      userId
    });
  }

  const ImagesInfoObj = await imageRepo.writeImagesInfo(filesInfo);
  return ImagesInfoObj;
};

// 이미지 삭제
export const imageDelete = async ({ userId, encryptedString }: DeleteImageQuerytype) => {
  const deletedImageInfoObj = await imageRepo.delere({ userId, encryptedString });
  return deletedImageInfoObj;
};