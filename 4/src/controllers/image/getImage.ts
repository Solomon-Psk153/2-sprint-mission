import { RequestHandler } from "express";
import imageService from "../../services/image/imageService";

const getImageHandler: RequestHandler = async function (req, res, next) {

    console.log('before');
    const encodedEncryptedString = req.params.encodedEncryptedString;
    console.log('after', encodedEncryptedString);
    const image = await imageService.getImage(encodedEncryptedString);

    res.sendFile(image);
};

export default getImageHandler;