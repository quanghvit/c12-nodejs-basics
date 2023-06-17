import { NextFunction, Request, Response } from 'express';
import { handleError } from '../utils/appError';
import { StatusCodes } from 'http-status-codes';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return handleError(res, StatusCodes.CONFLICT, `Session has expired or user doesn't exist`);
    }

    //TODO: get token and do something logic

    next();
  } catch (err: any) {
    next(err);
  }
};
