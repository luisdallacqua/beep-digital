import mongoose, { Schema, Document } from 'mongoose';
import { ITag } from './Tag';

export interface IUser {
    username: string;
    password: string;
}

export interface IUserModel extends ITag, Document {}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLenth: 6 }
});

export default mongoose.model<IUser>('User', UserSchema);
