import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo {
    video_url: string;
    tags: string[];
    description: string;
}

export interface IVideoModel extends IVideo, Document {}

const VideoSchema: Schema = new Schema({
    description: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'this is a required field'],
        minLength: [10, 'The minimum size of description is']
    },
    video_url: { type: String, required: [true, 'this is a required field'], unique: true },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
});

export default mongoose.model<IVideoModel>('Video', VideoSchema);
