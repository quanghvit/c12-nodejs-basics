import {
    create,
    update,
    getById,
    hardDelete,
    softDelete,
    listMyPosts,
} from '../controllers/post.controller';
import {
    getPostSchema,
    createPostSchema,
    updatePostSchema,
    deletePostSchema,
} from '../schemas/post.schema';
import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { zodValidator } from '../middlewares/zodValidator';

const router = express.Router();

// middlewares
router.use(requireAuth);

// routes
router
    .route('/')
    .get(listMyPosts)
    .post(zodValidator(createPostSchema), create);

router
    .route('/:id')
    .get(zodValidator(getPostSchema), getById)
    .put(zodValidator(updatePostSchema), update)

router
    .route('/:id/soft')
    .delete(zodValidator(deletePostSchema), softDelete)

router
    .route('/:id/hard')
    .delete(zodValidator(deletePostSchema), hardDelete)

export const postRouter = router;
