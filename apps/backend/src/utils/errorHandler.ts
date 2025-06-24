// apps/backend/src/utils/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

interface IError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Log the error for debugging purposes
  // In production, you might want to use a more sophisticated logger like Winston
  console.error('ERROR 💥', err);

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.stack, // In development, show stack. In production, you might hide this.
  });
};

export default errorHandler;