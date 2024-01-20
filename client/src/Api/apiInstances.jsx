import axios from 'axios';
export const apiInstances = axios.create({
    baseURL: 'http://localhost:8080'
});