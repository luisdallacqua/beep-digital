import mongoose, { Document, Schema } from 'mongoose';

export interface ITag {
    name: string;
    videos: string[];
}

export interface ITagModel extends ITag, Document {}

const TagSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
});

export default mongoose.model<ITagModel>('Tag', TagSchema);
