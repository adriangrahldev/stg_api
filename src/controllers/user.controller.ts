import { IUser } from '../interfaces/user.interface';
import User from '../models/user.model';
import { Response } from 'express';

class UserController {

    public async user(req: any, res: Response): Promise<Response> {
        const { userId } = req;
        if (!userId) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        const user: IUser | null = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        return res.status(200).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            }
        });
    }
}

export default new UserController();