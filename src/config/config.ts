import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const POST_URL = process.env.POST_URL;
const GET_URL = process.env.GET_URL;
const ACCESS_DENIED = process.env.ACCESS_DENIED;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
export const config = {
    server: {
        port: SERVER_PORT,
        postUrl: POST_URL,
        getUrl: GET_URL,
        access_denied: ACCESS_DENIED,
        email: EMAIL,
        PASSWORD: PASSWORD
    }
};
