import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../utils/types';

/**
 * Middleware function to authenticate user requests using JWT token.
 * @param {AuthRequest} req - The Express request object with user authentication information.
 * @param {Response} res - The Express response object for sending responses.
 * @param {NextFunction} next - The Express next function to pass control to the next middleware.
 */
const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
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

export default authenticateUser;
