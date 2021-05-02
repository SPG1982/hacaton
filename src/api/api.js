import axios from "axios";

export const api = axios.create({
    withCredentials: true,
    baseURL: 'https://server-hacaton.qpuzzle.ru:9000',
});

