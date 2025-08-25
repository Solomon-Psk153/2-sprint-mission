import { ErrorRequestHandler } from "express";
import { BadRequestError, ConflictError, ForbiddenError, LockedError, NotFoundError, UnauthorizedError } from "../utils/error/400.error";
import { InternalServerError, NotImplementedError, ServiceUnavailableError } from "../utils/error/500.error";
import multer from "multer";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = 500;
  let message = err.message;

  if (err instanceof BadRequestError) {
    status = 400;
    if (err instanceof multer.MulterError) message = "Multer Error";
  } else if (err instanceof UnauthorizedError) status = 401;
  else if (err instanceof ForbiddenError) status = 403;
  else if (err instanceof NotFoundError){
    status = 404;
    message = "Not Found"
  } else if (err instanceof ConflictError) status = 409;
  else if (err instanceof LockedError) status = 423;
  else if (err instanceof InternalServerError) {
    status = 500;
    message = "Internal Server Error"
  } else if (err instanceof NotImplementedError) status = 501;
  else if (err instanceof ServiceUnavailableError) status = 503;

  res.status(status).json({ message });
};