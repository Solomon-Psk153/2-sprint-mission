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
export const uploadSingleImage = async ( {userId, file}: ImageUploadQueryType ) => {
  const ImageInfoObj = await imageRepo.writeImageInfo({userId, file});
  return ImageInfoObj;
};

// 이미지들 업로드
export const uploadImages = async function ( {userId, files}: ImagesUploadQueryType ) {
  const ImagesInfoObj = await imageRepo.writeImagesInfo({userId, files});
  return ImagesInfoObj;
};

// 이미지 삭제
export const imageDelete = async ( {userId, encryptedString}: DeleteImageQuerytype ) => {
  const deletedImageInfoObj = await imageRepo.delere({userId, encryptedString});
  return deletedImageInfoObj;
};