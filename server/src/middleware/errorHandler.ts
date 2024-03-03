import type { NextFunction, Request, Response } from 'express';
import type { AuthRequest } from '../utils/types';

/**
 * Middleware function to handle errors and send appropriate responses.
 * @param {*} error - The error object to handle.
 * @param {Request | AuthRequest} _ - The Express request object (or AuthRequest for authentication).
 * @param {Response} res - The Express response object for sending error responses.
 * @param {NextFunction} __ - The Express next function (unused in this middleware).
 */
const errorHandler = (error: any, _: Request | AuthRequest, res: Response, __: NextFunction) => {
  const statusCode: number = error.statusCode ?? 500;
  res.status(statusCode).json({
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

export default errorHandler;
