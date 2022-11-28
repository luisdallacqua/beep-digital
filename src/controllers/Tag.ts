import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getDifferenceBetweenArrays } from '../helpers/helpers';
import Tag from '../models/Tag';
import Video, { IVideoModel } from '../models/Video';

const createTag = (req: Request, res: Response) => {
    const { name, videos } = req.body;

    const tag = new Tag({
        _id: new mongoose.Types.ObjectId(),
        name,
        videos: videos ? Array.from(new Set([...videos])) : []
    });

    return tag
        .save()
        .then((tag) => Video.updateMany({ _id: tag.videos }, { $addToSet: { tag: tag._id } }))
        .then(() => res.status(201).json({ tag }))
        .catch((error) => {
            if (error.code === 11000) {
                res.status(409).json({ message: "This tag already exists, it's not possible create another with same name" });
            }
            res.status(422).json({ error: error.message });
        });
};

const getVideosWithNameTag = (req: Request, res: Response) => {
    const title_tag = req.params.title_tag;

    return Tag.findOne({ name: title_tag })
        .populate('videos', 'description video_url')
        .then((tag) => (tag ? res.status(200).json({ videos: tag.videos }) : res.status(404).json({ message: 'This genre does not exist' })))
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

const readAll = (req: Request, res: Response) => {
    return Tag.find()
        .populate('videos', 'description video_url')
        .select('-__v')
        .then((tags) => res.status(200).json({ tags }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateTag = (req: Request, res: Response) => {
    const { tagId } = req.params;
    const tag = req.body;
    const newVideos = tag.videos || [];

    return Tag.findById(tagId)
        .then(async (oldTag) => {
            if (oldTag === null) {
                res.status(404).json({ message: 'This tag does not exist' });
            } else {
                const oldVideos = oldTag.videos;
                Object.assign(oldTag, tag);
                const newTag = await oldTag.save();

                const addedVideos = getDifferenceBetweenArrays(newVideos, oldVideos);
                const removedVideos = getDifferenceBetweenArrays(oldVideos, newVideos);

                await Video.updateMany({ _id: addedVideos }, { $addToSet: { tags: newTag?._id } });
                await Video.updateMany({ _id: removedVideos }, { $pull: { tags: newTag?._id } });

                res.status(200).json({ newTag });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
};
const deleteTag = (req: Request, res: Response) => {
    const tagId = req.params.tagId;

    return Tag.findByIdAndDelete(tagId)
        .then((tag) => Video.updateMany({ _id: tag?.videos }, { $pull: { tags: tag?._id } }))
        .then(() => res.status(200).json({ message: `Tag ${tagId} deleted successfully` }))
        .catch((error) => res.status(404).json({ error: error.message }));
};

export default { createTag, getVideosWithNameTag, readAll, updateTag, deleteTag };
