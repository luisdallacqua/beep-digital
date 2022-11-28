import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@rickapp.snrsj.mongodb.net/`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3333;
const SERVER_TOKEN_EXPIRETIME_IN_DAYS = process.env.SERVER_TOKEN_EXPIRETIME || 1;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || '';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT,
        token: {
            expireTime: SERVER_TOKEN_EXPIRETIME_IN_DAYS,
            secret: SERVER_TOKEN_SECRET,
            issuer: SERVER_TOKEN_ISSUER
        }
    }
};
