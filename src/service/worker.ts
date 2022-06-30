import { parentPort, workerData } from 'worker_threads';
import fetch from 'node-fetch';
import { config } from '../config/config';

const getCall = async () => {
    var header : any = 
        {
            'content-type': 'application/json',
            'Authorization': "Bearer "+workerData.value
        }        
    fetch('http://35.207.169.147/results', {
        headers: header
    })
.then((response) => {
                if (response.status === 204) {
                parentPort?.close();
                return {};
            } else {
                return response.json();
            }
        })
        .then((json) => parentPort?.postMessage({ race: json }))
        .catch(function (err) {
            throw new Error(err);
        });
};



getCall();
