import express, { json } from 'express';
import http from 'http';
import { config } from './config/config';
import { connect } from './config/database';
import Logging from './library/Logging';
import apiGateway from './routes/apiGateway';
import cors from 'cors';
import { Worker } from 'worker_threads';
import { horseDataSaved } from './controllers/horseDataSaved.controller';
import { reqObj } from './controllers/apiGateway.controller';
import commonUtils from './utils/commonUtils';
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

router.use('/api', apiGateway);

//Worker Thread create it will trigger automatically.

export function runThreadService(token:any) {
        return new Promise((resolve, reject) => {
        const worker = new Worker('c:/Users/shubham.sawant/Desktop/horseRace/build/service/worker.js', {
            workerData: {
                value:token?.token,
                path: './service/worker.ts'
            }
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

var sendToken : any
function run() {

    return runThreadService(sendToken)
        .then(async (data: any) => {
            console.log("------",data);
            if (Object.keys(data.race).length === 0) {
                run();
            } else if (data.race.error == config.server.access_denied) {
                    
                        const token = await commonUtils.postApiCall(config.server.postUrl, reqObj, { 'content-type': 'application/json' });
                        sendToken = token;
                        run();
                    
                
            } else {
                horseDataSaved(data);
                run();
            }
        })
        .catch(function (error) {
            console.log(`in catch`, error);
        });
}

run();

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    Logging.error(error);

    res.status(404).json({
        message: error.message
    });
});

http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
