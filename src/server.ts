import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import videoRoutes from './routes/Video';
import tagRoutes from './routes/Tag';

const router = express();

// connect to mongo
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connectedd to MongoDB');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect:');
        Logging.error(error);
    });

//Only start the server if Mongo Connects
const StartServer = () => {
    router.use((req, res, next) => {
        /**Log the Request */
        Logging.info(`Incoming -> Method [${req.method}] -URL [${req.url}]`);

        res.on('finish', () => {
            /**Log the Response */
            Logging.info(`Incoming -> Method [${req.method}] -URL [${req.url}] - Status[${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /**Rules of API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Acess-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /**Routes */
    router.use('/videos', videoRoutes);
    router.use('/tags', tagRoutes);

    /**Error handling */
    router.use((req, res, next) => {
        const error = new Error('This page was not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
