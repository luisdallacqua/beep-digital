import mongoose, { Schema, Document } from 'mongoose';
import { ITag } from './Tag';

export interface IUser {
    username: string;
    password: string;
}

export interface IUserModel extends ITag, Document {}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, minLenth: [3, 'User has to be at least 3 characters length'] },
    password: { type: String, required: true, minLenth: [6, 'Password has to be at least 6 characters length'] }
});

export default mongoose.model<IUser>('User', UserSchema);
