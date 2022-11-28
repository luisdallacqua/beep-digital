import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import signJWT from '../helpers/signJWT';
import { config } from '../config/config';

const NAMESPACE = 'Users';

const register = (req: Request, res: Response) => {
    let { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hashPassword) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hashPassword
        });

        return user
            .save()
            .then((user) => res.status(201).json({ message: `User was created successfuy` }))
            .catch((error) => res.status(500).json({ message: error.message, error }));
    });
};

const login = (req: Request, res: Response) => {
    let { username, password } = req.body;

    return User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                bcryptjs.compare(password, user.password || '', (error, result) => {
                    if (error) {
                        Logging.error(`${NAMESPACE}, ${error.message}`);

                        return res.status(401).json({
                            message: 'Unauthorized'
                        });
                    } else if (result) {
                        signJWT(user, (error, token) => {
                            if (error) {
                                Logging.error(`${NAMESPACE}, "Unable to sign token", ${error.message}`);

                                return res.status(401).json({
                                    message: 'Unauthorized',
                                    error: error.message
                                });
                            } else if (token) {
                                return res
                                    .cookie('jwt', token, { httpOnly: true, maxAge: Number(config.server.token.expireTime) * 60 * 60 * 24 * 1000 })
                                    .status(200)
                                    .json({
                                        message: 'Login auth successful',
                                        user: {
                                            username: user.username
                                        }
                                    });
                            }
                        });
                    }
                });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message, error }));
};

const getAllUsers = (req: Request, res: Response) => {
    return User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users,
                count: users.length
            });
        })
        .catch((error) => res.status(500).json({ message: error.message, error }));
};

export default { register, login, getAllUsers };
