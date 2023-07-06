import { Response } from "express";

export function handleError(
  res: Response,
  statusCode: number = 500,
  message: string,
  error: object | undefined = undefined
) {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    error,
  });
}