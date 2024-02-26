import express from 'express';
import authRouter from './auth.route';
const router = express.Router();

// Definir las rutas aquí
router.get('/', (req, res) => {
    res.json({msg:'¡Hola, mundo!'});
});
router.use('/auth', authRouter);

export default router;
