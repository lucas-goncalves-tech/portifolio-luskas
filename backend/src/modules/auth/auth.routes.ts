import { container } from 'tsyringe';
import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../core/middlewares/ValidationMiddleware';
import { LoginRequestSchema, RefreshTokenRequestSchema } from './dtos/AuthRequest.dto';

const router = Router();

const authController = container.resolve(AuthController);

router.post('/login', validateRequest(LoginRequestSchema), authController.login);
router.post('/refresh', validateRequest(RefreshTokenRequestSchema), authController.refresh);
router.post('/logout', authController.logout);

export default router;
