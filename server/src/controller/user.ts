import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.ts';

export const signUpUser = (req: Request, res: Response) => {
  const _signUpUser = async () => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password as string, 10);

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser !== null) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });

      const { JWT_SECRET } = process.env;
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET as string);

      res.status(201).json({
        message: 'User created successfully',
        data: {
          name: newUser.name,
          email: newUser.email,
          token
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  void _signUpUser();
};

export const loginUser = (req: Request, res: Response) => {
  const _loginUser = async () => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user === null) {
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password as string, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const { JWT_SECRET } = process.env;
      const token = jwt.sign({ userId: user.id }, JWT_SECRET as string);

      res.status(200).json({
        message: 'User found',
        data: {
          name: user.name,
          email: user.email,
          token
        }
      });
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  void _loginUser();
};
