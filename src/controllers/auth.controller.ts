import { sign } from "jsonwebtoken";
import { randomUUID } from "crypto";
import { AppConstants } from "../const";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../utils/appError";
import { JwtPayload } from "../types/auth.types";
import { NextFunction, Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/user.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        // validate user existence
        if (!user)
            return handleError(res, 400, `Invalid credentials, user with email=${email} not found.`);
        // validate password
        if (!user.validateHashedPassword(password))
            return handleError(res, 400, `Invalid credentials. Password unmatched.`);

        // sign new access token
        const jwtPayload: JwtPayload = {
            id: user.id,
            email: user.email,
        };
        const accessToken = sign(
            jwtPayload,
            AppConstants.jwt.secret,
            { expiresIn: AppConstants.jwt.expireIn }
        );

        res.status(StatusCodes.OK).json({
            success: true,
            data: { accessToken },
        });
    } catch (err) {
        next(err);
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        // validate user existence
        const user = await findUserByEmail(email);
        if (user)
            return handleError(res, StatusCodes.CONFLICT, `User with email=${email} already exists`);

        // create new user record
        const id = randomUUID();
        const registeredUser = await createUser({
            ...req.body,
            id,
            createdBy: id,
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            data: {
                id: registeredUser.id,
                name: registeredUser.name,
                email: registeredUser.email,
                createdAt: registeredUser.createdAt,
            },
        });
    } catch (err) {
        next(err);
    }
}