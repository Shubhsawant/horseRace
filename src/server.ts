import express from 'express';
import http from 'http';
import { config } from './config/config';
import { connect } from './config/database';
import Logging from './library/Logging';
import apiGateway from './routes/apiGateway'
import cors from 'cors';
import { Worker } from 'worker_threads';
const router = express();

connect();

    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use(cors());

    /** Routes */

    router.use('/api',apiGateway)
    
// let workerData = {}
// const worker = new Worker('../src/service/worker.js', { workerData } );

// worker.on('message', (result:any) => {
//     console.log(result);
// });



    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
