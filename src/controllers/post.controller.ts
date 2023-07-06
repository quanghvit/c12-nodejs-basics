import { randomUUID } from "crypto";
import { User } from "../entities/users.entity";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../utils/appError";
import { Post } from "../entities/posts.entity";
import { CreatePostInput } from "../schemas/post.schema";
import { NextFunction, Request, Response } from "express";
import { UsersPosts } from "../entities/usersPosts.entity";
import { createPostTransaction, deletePostTransaction, findPostById, listUserPosts, updatePostTransaction } from "../services/post.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { htmlCode } = req.body as CreatePostInput;
        const authUser = res.locals.user as User;
        const newPostId = randomUUID();

        // 1. create a post payload
        const postPayload: Partial<Post> = {
            id: newPostId,
            htmlCode,
            createdBy: authUser.id,
        }

        // 2. create a userPost payload
        const userPostPayload: Partial<UsersPosts> = {
            userId: authUser.id,
            postId: newPostId,
            createdBy: authUser.id,
            updatedBy: authUser.id,
        }

        // 3. create new Post and UserPost using transaction
        const data = await createPostTransaction(postPayload, userPostPayload);

        res.status(StatusCodes.CREATED).json({
            success: true,
            data,
        })
    } catch (err) {
        next(err);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authUser = res.locals.user as User;

        // 1. get postId, update body request params + body
        const { id: postId } = req.params;
        const { htmlCode } = req.body;
        
        // 2. find post from database
        const post = await findPostById(postId, false);

        // 3. validate post existence
        if (!post)
            return handleError(res, StatusCodes.NOT_FOUND, `Post with id=${postId} not found`);

        // 4. create update payload for Post
        const updatePostPayload: Partial<Post> = {
            ...post,
            htmlCode,
            updatedBy: authUser.id,
        }

        // 5. create payload for new UserPost
        const userPostPayload: Partial<UsersPosts> = {
            userId: authUser.id,
            postId: post.id,
            createdBy: authUser.id,
            updatedBy: authUser.id,
        }

        // 3. create new Post and UserPost using transaction
        const data = await updatePostTransaction(post.id, updatePostPayload, userPostPayload);

        res.status(StatusCodes.CREATED).json({
            success: true,
            data,
        });
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

export const deletePost = (isSoftDelete: boolean) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 1. get postID from request params
            const { id: postId } = req.params;
            
            // 2. find post from database
            const post = await findPostById(postId);
    
            // 3. validate post existence
            if (!post)
                return handleError(res, StatusCodes.NOT_FOUND, `Post with id=${postId} not found`);
    
            // 4. delete post & its related userPost from database
            await deletePostTransaction(postId, isSoftDelete);
    
            res.status(StatusCodes.OK).json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    };
}