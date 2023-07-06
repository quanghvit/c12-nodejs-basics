import {
    getMe,
    getUserById,
    createUserHandler,
} from '../controllers/user.controller';
import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';
import { zodValidator } from '../middlewares/zodValidator';
import { createUserSchema } from '../schemas/user.schema';

const router = express.Router();

// middlewares
router.use(requireAuth);

// routes
router
    .route('/')
    .post(zodValidator(createUserSchema), createUserHandler);

router
    .route('/me')
    .get(getMe);

router
    .route('/:id')
    .get(getUserById);

export const userRouter = router;
