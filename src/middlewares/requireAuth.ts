import * as jwt from 'jsonwebtoken';
import { AppConstants } from '../const';
import { StatusCodes } from 'http-status-codes';
import { handleError } from '../utils/appError';
import { JwtPayload } from '../types/auth.types';
import { findUserById } from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      return handleError(res, StatusCodes.UNAUTHORIZED, `Session has expired or invalid auth token...`);
    }
    const token = req.headers.authorization.split(' ')[1];
    const jwtPayload = jwt.verify(token, AppConstants.jwt.secret) as JwtPayload;
    if (!jwtPayload)
      return handleError(res, StatusCodes.UNAUTHORIZED, `Invalid auth token...`);

    // Check if the user still exist
    const user = await findUserById(jwtPayload.id);
    if (!user)
      return handleError(res, StatusCodes.UNAUTHORIZED, `Invalid auth token. User not found...`);
    if (!user.isActive)
      return handleError(res, StatusCodes.UNAUTHORIZED, `Invalid auth token. Inactive account...`);

    // Add user to res.locals
    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
