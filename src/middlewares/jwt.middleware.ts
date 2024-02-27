import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface RequestWithUser extends Request {
    userId: any;
  }
// Define una función de middleware para verificar el token JWT
export const verificarToken = (req: any, res: Response, next: NextFunction) => {
    // Obtén el token del encabezado de la solicitud
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Verifica si el token existe
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso no autorizado' });
    }

    try {
        // Verifica y decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'STG_SECRET_KEY_123');

        // Agrega el objeto decodificado al objeto de solicitud
        req.userId = decoded;

        // Continúa con el siguiente middleware o controlador
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};