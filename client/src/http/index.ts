import axios from 'axios';

export const API_URL = `http://localhost:8080`

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((config: any) => {
    console.log(config);
    
    if ( !config.url.includes('/login') || !config.url.includes('/registration') ) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    
    return config;
})