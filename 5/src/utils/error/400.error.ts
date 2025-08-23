import { AppError } from "./app.error";

export class BadRequestError extends AppError {
  constructor( message:string ){
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor( message:string ){
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor( message:string ){
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor( message:string ){
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor( message:string ){
    super(409, message);
  }
}

export class LockedError extends AppError {
  constructor( message:string ){
    super(423, message);
  }
}