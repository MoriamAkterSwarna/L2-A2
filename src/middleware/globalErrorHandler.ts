import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

interface AppError extends Error {
  statusCode?: number;
  errors?: string;
  code?: string;
}

const globalErrorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong';
  let errors = err.errors || err.message;

  if (err.code === '23505') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Duplicate field value entered';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export default globalErrorHandler;