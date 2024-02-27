import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';
import { verificarToken } from '../middlewares/jwt.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/user', verificarToken, UserController.user);

export default router;