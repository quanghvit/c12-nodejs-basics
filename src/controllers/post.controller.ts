import { User } from "../entities/users.entity";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import { findPostById, listUserPosts } from "../services/post.service";

export const create = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const update = (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
}

export const listMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. get authenticated user info
        const authUser = res.locals.user as User;

        // 2. find my posts
        const myPosts = await listUserPosts(authUser.id);

        // 3. return data to response
        res.status(StatusCodes.OK).json({
            success: true,
            data: myPosts,
        })
    } catch (err) {
        next(err);
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. get postID from request params
        const { id: postId } = req.params;
        
        // 2. find post from database
        const post = await findPostById(postId);

        // 3. validate post existence
        if (!post)
            return handleError(res, StatusCodes.NOT_FOUND, `Post with id=${postId} not found`);

        // 4. return post data in response
        res.status(StatusCodes.OK).json({
            success: true,
            data: post,
        });
    } catch (err) {
        next(err);
    }
}

export const softDelete = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err);
    }
}

export const hardDelete = (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
}