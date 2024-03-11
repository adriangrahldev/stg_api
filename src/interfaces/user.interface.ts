export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    role: string;
    permissions: string[];
}