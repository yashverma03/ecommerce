import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.ts';
import type { AuthRequest } from '../utils/types';

interface UserBody {
  email: string;
  password: string;
}

interface CreateUserBody extends UserBody {
  name: string;
}

const { JWT_SECRET } = process.env;

export const createUser = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const { name, email, password }: CreateUserBody = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser !== null) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });

      if (JWT_SECRET === undefined) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }

      const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET);

      res.status(201).json({
        message: 'User created successfully',
        data: {
          name: newUser.name,
          email: newUser.email,
          token
        }
      });
    } catch (error) {
      console.error('Error creating user', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  void request();
};

export const getUserByEmail = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const { email, password }: UserBody = req.body;
      const user = await User.findOne({ where: { email } });

      if (user === null) {
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      if (JWT_SECRET === undefined) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }

      const token = jwt.sign({ userId: user.userId }, JWT_SECRET);

      res.status(200).json({
        message: 'User found',
        data: {
          name: user.name,
          email: user.email,
          token
        }
      });
    } catch (error) {
      console.error('Error getting user', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  void request();
};

export const verifyUser = (req: AuthRequest, res: Response) => {
  try {
    res.status(202).json({
      message: 'User verified successfully',
      userId: req.userId,
      isUserValid: true
    });
  } catch (error) {
    console.error('Error in verifying user', error);
    res.status(500).json({ error: 'Internal server error', isUserValid: false });
  }
};
