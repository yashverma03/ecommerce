import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to set Cache-Control header for HTTP responses.
 * @param {Request} req - The Express request object (unused in this middleware).
 * @param {Response} res - The Express response object for setting Cache-Control header.
 * @param {NextFunction} next - The Express next function to pass control to the next middleware.
 */
const cacheControl = (_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  next();
};

export default cacheControl;
