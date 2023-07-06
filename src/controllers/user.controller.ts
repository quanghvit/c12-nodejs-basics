import { randomUUID } from 'crypto';
import { handleError } from '../utils/appError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../entities/users.entity';
import { NextFunction, Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById } from '../services/user.service';

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user from res.locals
    const authUser = res.locals.user as User;
    if (!authUser)
      return handleError(res, StatusCodes.BAD_REQUEST, 'Body invalid');

    res
      .status(StatusCodes.CREATED)
      .json({
        data: authUser,
      });
  } catch (err) {
    next(err);
  }
}

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return handleError(res, StatusCodes.BAD_REQUEST, 'Body invalid');

    const user = await findUserByEmail(email);
    if (user)
      return handleError(res, StatusCodes.CONFLICT, `User with email=${email} already exists`);

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