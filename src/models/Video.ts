import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo {
    video_url: string;
    tag: string[];
    description: string;
}

export interface IVideoModel extends IVideo, Document {}

const VideoSchema: Schema = new Schema({
    description: { type: String, unique: true, required: [true, 'este é um campo obrigatório'] },
    video_url: { type: String, required: [true, 'este é um campo obrigatório'], unique: true },
    tag: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
});

export default mongoose.model<IVideoModel>('Video', VideoSchema);
