import axios from 'axios';

/**
 * Axios instance for making API requests.
 *
 * @type {import("axios").AxiosInstance}
 */
const cliente = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
    });

export default cliente;