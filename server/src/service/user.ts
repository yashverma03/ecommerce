import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.ts';
import type { CreateUserBody, UserBody } from '../utils/types.ts';

const { JWT_SECRET } = process.env;

export const createUserService = async (body: CreateUserBody) => {
  try {
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ where: { email } });

    if (JWT_SECRET === undefined) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    if (existingUser !== null) {
      return { error: 'Email already exists', statusCode: 409 };
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET);

    const user = {
      userId: newUser.userId,
      name: newUser.name,
      email: newUser.email,
      token
    };

    return { user };
  } catch (error: any) {
    throw new Error(`Error creating user. ${error.message}`);
  }
};

export const getUserByEmailService = async (body: UserBody) => {
  try {
    const { email, password } = body;
    const existingUser = await User.findOne({ where: { email } });

    if (JWT_SECRET === undefined) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    if (existingUser === null) {
      return { error: 'User not found', statusCode: 404 };
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return { error: 'Incorrect password', statusCode: 401 };
    }

    const token = jwt.sign({ userId: existingUser.userId }, JWT_SECRET);

    const user = {
      userId: existingUser.userId,
      name: existingUser.name,
      email: existingUser.email,
      token
    };

    return { user };
  } catch (error: any) {
    throw new Error(`Error getting user. ${error.message}`);
  }
};
