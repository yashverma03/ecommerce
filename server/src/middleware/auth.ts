import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../utils/types';

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const { JWT_SECRET } = process.env;

    if (token === undefined) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    if (JWT_SECRET === undefined) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'object' && 'userId' in decoded) {
      req.userId = decoded.userId;
      next();
    } else {
      throw new Error('Id is invalid');
    }
  } catch (error) {
    console.error('User is unauthorized and invalid', error);
    res.status(401).json({
      error: 'Unauthorized: Invalid token',
      data: {
        isUserValid: false
      }
    });
  }
};
