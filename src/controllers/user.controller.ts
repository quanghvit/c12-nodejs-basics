import { NextFunction, Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById } from '../services/user.service';
import { randomUUID } from 'crypto';
import { handleError } from '../utils/appError';
import { StatusCodes } from 'http-status-codes';

export const createPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return handleError(res, StatusCodes.CONFLICT, 'Body invalid');
    }
    const user = await findUserByEmail(email);
    if (user) {
      return handleError(res, StatusCodes.CONFLICT, 'User exist');
    }

    const id = randomUUID();
    req.body.id = id;
    await createUser(req.body);
    const result = await findUserById(id);
    res.status(201).json({
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await findUserById(id);
    res.status(201).json({
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};