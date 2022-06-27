import parentPort , { workerData } from 'worker_threads';
import fetch from 'node-fetch';

fetch('http://35.207.169.147/results', {
}).then(data => {
    if (data.status === 204) {
        parentPort.parentPort?.close
        return {};
    } else {
        return data.json();
    }
}).then(
    json => parentPort.parentPort?.postMessage({ race: json })
).catch(
    function (err) {
        throw new Error(err);
    }
);