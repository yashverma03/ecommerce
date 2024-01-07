import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user.ts';

export const createUser = (req: Request, res: Response) => {
  const _createUser = async () => {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password as string, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        type
      });

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  void _createUser();
};
