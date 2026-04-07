import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateLoginBody, validateRegisterBody } from '../middleware/validateAuthBody.js';
import { authenticate } from '../middleware/authenticate.js';

export const authRouter = Router();

authRouter.post('/register', validateRegisterBody, asyncHandler(authController.register));
authRouter.post('/login', validateLoginBody, asyncHandler(authController.login));
authRouter.get('/me', authenticate, authController.profile);
