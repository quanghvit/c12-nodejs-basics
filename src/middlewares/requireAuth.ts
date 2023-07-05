import { handleError } from '../utils/appError';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return handleError(res, StatusCodes.UNAUTHORIZED, `Session has expired or invalid auth token`);
    }

    //TODO: get token and do something logic

    next();
  } catch (err: any) {
    next(err);
  }
};
