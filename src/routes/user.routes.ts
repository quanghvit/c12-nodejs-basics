import express from 'express';
import {
    createPostHandler,
    getUserById
} from '../controllers/user.controller';
import { requireUser } from '../middlewares/requireUser';

const router = express.Router();

// middlewares
// router.use(functionName1, functionName2, functionName3);
router.use(requireUser);

router
    .route('/')
    .post(createPostHandler);

router
    .route('/:id')
    .get(getUserById);

export default router;
