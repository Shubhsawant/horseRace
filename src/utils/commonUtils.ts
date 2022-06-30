import axios from 'axios';

const postApiCall = async (url: any, body: any, reqHeaders: any) => {
    try {
        let data, headers;
        const contentType = reqHeaders['content-type'].split(';')[0];
        data = body;
        headers = { 'content-type': 'application/json' };

        const resp = await axios.post(url, data, {
            headers: headers
        });
        return resp.data;
    } catch (error) {
        console.log('postApiCall Error', error);
    }
};

const getApiCall = async (url: any, params: any, headers: any) => {
    try {
        let headersObj = { 'content-type': 'application/json' };
        if (headers) {
            headersObj = { 'content-type': 'application/json', ...headers };
        }

        let paramObj;
        if (params) {
            paramObj = params;
        }
        const data = await axios.get(url, { params: paramObj, headers: headersObj });
        return data;
    } catch (error) {
        console.log('getApiCall Error', error);
    }
};

export default { postApiCall, getApiCall };
