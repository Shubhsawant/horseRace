import path from 'path';
import { workerData } from 'worker_threads';

require('ts-node').register();
require(path.resolve(__dirname, workerData.path));
