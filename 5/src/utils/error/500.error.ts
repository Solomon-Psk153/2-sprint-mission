import { AppError } from "./app.error";

export class InternalServerError extends AppError {
  constructor( message:string ){
    super(500, message);
  }
}

export class NotImplementedError extends AppError {
  constructor( message:string ){
    super(501, message);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor( message:string ){
    super(503, message);
  }
}