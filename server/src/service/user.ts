import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.ts';
import type { CreateUserBody, UserBody } from '../utils/types.ts';
import CustomError from '../utils/CustomError.ts';

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
      throw new CustomError('Email already exists', 409);
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET);

    return {
      userId: newUser.userId,
      name: newUser.name,
      email: newUser.email,
      token
    };
  } catch (error: any) {
    throw new CustomError(`Error creating user. ${error.message}`, error.statusCode as number);
  }
};

export const getUserByEmailService = async (body: UserBody) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ where: { email } });

    if (JWT_SECRET === undefined) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    if (user === null) {
      throw new CustomError('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError('Incorrect password', 401);
    }

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET);

    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      token
    };
  } catch (error: any) {
    throw new CustomError(`Error getting user. ${error.message}`, error.statusCode as number);
  }
};
