import type { NextFunction, Request, Response } from 'express';
import type { AuthRequest } from '../utils/types';

export const errorHandler = (
  error: any,
  _: Request | AuthRequest,
  res: Response,
  __: NextFunction
) => {
  const statusCode: number = error.statusCode ?? 500;
  res.status(statusCode).json({
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};
