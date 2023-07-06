import express from 'express';
import { zodValidator } from '../middlewares/zodValidator';
import { login, register } from '../controllers/auth.controller';
import { createUserSchema, loginSchema } from '../schemas/user.schema';

const router = express.Router();

router
    .route('/login')
    .post(zodValidator(loginSchema), login);

router
    .route('/register')
    .post(zodValidator(createUserSchema), register);

export const authRouter = router;
