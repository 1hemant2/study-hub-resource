import axios from 'axios';
export const apiInstances = axios.create({
    baseURL: 'https://study-hub-ltxg.onrender.com'
});