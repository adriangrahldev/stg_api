import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    role: string;
    permissions: string[];
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    role: { type: String, default: 'user' }, // por defecto, el rol es 'user'
    permissions: { type: [String], default: [] } // por defecto, no hay permisos
});

UserSchema.pre<IUser>('save', function(next) {
    this.username = this.email.split('@')[0];
    next();
});

export default mongoose.model<IUser>('User', UserSchema);