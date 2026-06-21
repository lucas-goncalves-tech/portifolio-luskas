import { Request, Response, NextFunction } from 'express';
import { BaseException } from '../exceptions/BaseException';
import { ZodError } from 'zod';

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof BaseException) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors,
    });
    return;
  }

  console.error('[Unhandled Error]', err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
