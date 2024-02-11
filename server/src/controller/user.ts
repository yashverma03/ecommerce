import type { NextFunction, Request, Response } from 'express';
import type { AuthRequest } from '../utils/types';
import { createUserService, getUserByEmailService } from '../service/user.ts';
import type { CreateUserBody, UserBody } from '../utils/types.ts';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const body: CreateUserBody = req.body;

      const newUser = await createUserService(body);

      res.status(201).json({
        message: 'User created successfully',
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  };

  void request();
};

export const getUserByEmail = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const body: UserBody = req.body;

      const user = await getUserByEmailService(body);

      res.status(200).json({
        message: 'User found',
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  void request();
};

export const verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.status(202).json({
      message: 'User verified successfully',
      userId: req.userId,
      isUserValid: true
    });
  } catch (error) {
    next(error);
  }
};
