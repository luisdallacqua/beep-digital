import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getDifferenceBetweenArrays } from '../helpers/helpers';
import Tag from '../models/Tag';
import Video from '../models/Video';

const createVideo = async (req: Request, res: Response) => {
    const { tags } = req.body;
    const video = new Video({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        tags: tags ? Array.from(new Set([...tags])) : []
    });

    return video
        .save()
        .then((newVideo) => Tag.updateMany({ _id: newVideo.tags }, { $addToSet: { videos: newVideo._id } }))
        .then(() => res.status(201).json({ video }))
        .catch((error) => {
            if (error?.code === 11000) {
                return res.status(409).json({ message: "This video already exists, it's not possible create another with same description and/or url" });
            }
            return res.status(403).json({ error: error.message });
        });
};

const readVideo = (req: Request, res: Response) => {
    const videoId = req.params.videoId;

    return Video.findById(videoId)
        .populate('tags', 'name')
        .select('-__v')
        .then((video) => (video ? res.status(200).json({ video }) : res.status(404).json({ message: 'Video not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
    return Video.find()
        .populate('tags', 'name')
        .select('-__v')
        .then((videos) => res.status(200).json({ videos }))
        .catch((error) => res.status(500).json({ error }));
};

const updateVideo = async (req: Request, res: Response) => {
    const { videoId } = req.params;
    const video = req.body;
    const newTags = video.tags || [];

    return Video.findById(videoId)
        .then(async (oldVideo) => {
            if (oldVideo === null) {
                res.status(404).json({ message: 'This video does not exist' });
            } else {
                const oldTags = oldVideo.tags;
                Object.assign(oldVideo, video);
                const newVideo = await oldVideo.save();

                const addedTags = getDifferenceBetweenArrays(newTags, oldTags);
                const removedTags = getDifferenceBetweenArrays(oldTags, newTags);
                await Tag.updateMany({ _id: addedTags }, { $addToSet: { videos: newVideo?._id } });
                await Tag.updateMany({ _id: removedTags }, { $pull: { videos: newVideo?._id } });
                res.status(200).json({ newVideo });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
};

const deleteVideo = async (req: Request, res: Response) => {
    const videoId = req.params.videoId;

    return Video.findByIdAndDelete(videoId)
        .then((video) => Tag.updateMany({ _id: video?.tags }, { $pull: { videos: video?._id } }))
        .then(() => res.status(200).json({ message: `The video ${videoId} was deleted successfully` }))
        .catch((error) => res.status(404).json({ message: 'Video not found, is not possible to delete it', error: error.message }));
};
export default { createVideo, readVideo, readAll, updateVideo, deleteVideo };
