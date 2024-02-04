import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.ts';

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

      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET);

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
      res.status(500).json({ error });
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

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

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
      res.status(500).json({ error });
    }
  };

  void request();
};

export const verifyUser = (req: Request, res: Response) => {
  const request = () => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (token === undefined) {
        return res.status(401).json({ error: 'Token not provided' });
      }

      if (JWT_SECRET === undefined) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (typeof decoded === 'object' && 'userId' in decoded) {
        res.status(200).json({
          message: 'User verified successfully',
          isUserValid: true,
          userId: decoded.userId
        });
      } else {
        throw new Error('Token verification failed');
      }
    } catch (error) {
      console.error('Token verification failed', error);
      res.status(401).json({
        isUserValid: false,
        error
      });
    }
  };

  void request();
};
