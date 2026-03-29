import axios from "axios";

const baseURL = 'https://tarefasapi.kauanrodrigues.com.br';
// const baseURL = 'http://localhost:7007';

export const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 17000,
});

export default instance;