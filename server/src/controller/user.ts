import type { Request, Response } from 'express';
import User from '../model/user.ts';

export const createUser = (req: Request, res: Response) => {
  void (async () => {
    try {
      const { name, email, password, type } = req.body;

      const newUser = await User.create({
        name,
        email,
        password,
        type
      });

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })();
};
