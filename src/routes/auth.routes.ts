import express from 'express';
import { login, register } from '../controllers/auth.controller';

const router = express.Router();

router
    .route('/login')
    .post(login);

router
    .route('/register')
    .post(register);

export const authRouter = router;
