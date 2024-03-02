import type { Request, Response, NextFunction } from 'express';

const cacheControl = (_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  next();
};

export default cacheControl;
