import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Logging from '../library/Logging';
import { IUser } from '../models/User';

const NAMESPACE = 'Auth Sign In';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    let timeSinceEpoc = new Date().getTime();
    let expirationTimeInSeconds = timeSinceEpoc + Number(config.server.token.expireTime) * 10;

    Logging.info(`${NAMESPACE} Attempting to sign token for ${user.username}`);

    try {
        jwt.sign(
            { username: user.username },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        Logging.error(`${NAMESPACE}, ${error} `);
        callback(new Error('error to sign with JWT'), null);
    }
};

export default signJWT;
