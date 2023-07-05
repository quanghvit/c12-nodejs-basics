import {
    list,
    create,
    update,
    getById,
    hardDelete,
    softDelete,
} from '../controllers/post.controller';
import express from 'express';
import { requireAuth } from '../middlewares/requireAuth';

const router = express.Router();

// middlewares
router.use(requireAuth);

// routes
router
    .route('/')
    .get(list)
    .post(create);

router
    .route('/:id')
    .get(getById)
    .put(update)

router
    .route('/:id/soft')
    .delete(softDelete)

router
    .route('/:id/hard')
    .delete(hardDelete)

export const postRouter = router;
