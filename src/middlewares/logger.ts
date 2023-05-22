import { NextFunction, Request, Response } from "express";

export const Logger = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(new Date(), req.path, req.method);
        next()
    } catch (error) {
        res.status(500).send({ error });
    }
}
