import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: unknown;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const { JWT_SECRET } = process.env;

    if (authorization === undefined) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
