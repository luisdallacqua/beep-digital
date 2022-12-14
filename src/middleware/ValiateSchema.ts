import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/Logging';
import { IVideo } from '../models/Video';
import { ITag } from '../models/Tag';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    video: {
        create: Joi.object<IVideo>({
            video_url: Joi.string()
                .required()
                .pattern(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/),
            description: Joi.string().required(),
            tags: Joi.array().items(Joi.string())
        }),
        update: Joi.object<IVideo>({
            video_url: Joi.string()
                .required()
                .pattern(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/),
            description: Joi.string().required(),
            tags: Joi.array().items(Joi.string())
        })
    }
};
