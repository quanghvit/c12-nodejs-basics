import {
    getMe,
    getUserById,
    createPostHandler,
} from '../controllers/user.controller';
import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';

const router = express.Router();

// middlewares
router.use(requireAuth);

// routes
router
    .route('/')
    .post(createPostHandler);

router
    .route('/me')
    .get(getMe);

router
    .route('/:id')
    .get(getUserById);

export const userRouter = router;
