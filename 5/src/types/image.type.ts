type MulterFile = Express.Multer.File;

type ImageUploadDataType = {
  userId: string;
  file: MulterFile;
};

type ImageUploadQueryType = {
  id: string;
  mimetype: string;
  originalname: string;
  filename: string;
  path: string;
  userId: string;
};

type ImagesUploadDataType = {
  userId: string;
  files: MulterFile[];
};

type ImagesUploadQueryType = ImageUploadQueryType[];

type DeleteImageQuerytype = {
  userId: string;
  encryptedString: string;
}