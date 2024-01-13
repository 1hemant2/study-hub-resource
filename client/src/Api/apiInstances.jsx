import axios from 'axios';
export const apiInstances = axios.create({
    baseURL: 'https://study-resourehub-backends.onrender.com', // Add the 'http://' protocol
});