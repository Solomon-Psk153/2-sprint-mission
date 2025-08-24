type MulterFile = Express.Multer.File;

type ImageUploadQueryType = {
  userId: string;
  file: MulterFile;
};

type ImagesUploadQueryType = {
  userId: string;
  files: MulterFile[];
};

type DeleteImageQuerytype = {
  userId: string;
  encryptedString: string;
}