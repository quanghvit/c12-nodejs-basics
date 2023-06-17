import { Response } from "express";

export function handleError(res: Response, statusCode: number = 500, message: string) {
  return res.status(statusCode).json({ message });
}