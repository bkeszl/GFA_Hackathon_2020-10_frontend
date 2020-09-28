import dotenv from 'dotenv';

dotenv.config();

export default {
    backendUrl: process.env.REACT_APP_BACKEND_URL,
};