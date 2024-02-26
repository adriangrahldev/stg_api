import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

class AuthController {
    public async register(req: Request, res: Response) {
        const { firstName, lastName, email, password, role, permissions } = req.body;

        // Comprueba si el email ya está en uso
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hashea la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crea un nuevo usuario
        const newUser: IUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            permissions
        });
        await newUser.save();
        const userObject = newUser.toObject();
        delete userObject.password;

        return res.status(201).json({ message: 'User registered successfully', user: userObject });
    }
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        // Comprueba si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Comprueba si la contraseña es correcta
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Genera un token JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'STG_SECRET_KEY_123');

        return res.header('auth-token', token).json({ message: 'Logged in successfully', token });
    }
}

export default new AuthController();