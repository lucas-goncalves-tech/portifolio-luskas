import { Router } from 'express';
import { loginController } from '../controllers/authController';

export const authRouter = Router();

authRouter.post('/login', loginController);
