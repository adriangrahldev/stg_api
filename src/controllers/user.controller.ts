import User, { IUser } from '../models/user.model';
import { Request, Response } from 'express';
import { RequestWithUser } from '../middlewares/jwt.middleware';

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
        const userObject = user.toObject();
        delete userObject.password;
        return res.status(200).json(userObject);
    }
}

export default new UserController();