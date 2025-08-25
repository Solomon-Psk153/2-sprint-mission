export class AppError extends Error {
  protected status: number;
  
  constructor( status: number, message: string ) {
    super(message);
    this.status = status;
  }
}