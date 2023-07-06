import { AnyZodObject, ZodError } from "zod";
import { handleError } from "../utils/appError";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

export const zodValidator = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return handleError(res, StatusCodes.BAD_REQUEST, 'Zod validation failed',  error.errors)
      }
      next(error);
    }
  }
};