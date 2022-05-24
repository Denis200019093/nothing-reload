import axios from 'axios';
import ApiError from '../exceptions/api-error';
export const API_URL = `http://localhost:8080`

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

const token = localStorage.getItem('token')

$api.interceptors.request.use((config: any) => {
    
    if ( config.url.includes('/login') 
        || config.url.includes('/registration') 
        || (config.url.includes('/posts') && config.method.includes('get') && token !== null) ) {
        return config
    } else {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    console.log();

    // if ( config.url.includes('/login') || config.url.includes('/registration') || (config.url.includes('/posts') && config.method.includes('get')) ) {
    //     return 
    // } else {
    //     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    // }
    
    // if ( !config.url.includes('/login') || !config.url.includes('/registration') || (!config.url.includes('/posts') && !config.method.includes('get')) ) {
    //     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    //     console.log('ROken');
        
    // }
    
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {

    if (error.response.status === 401) {
        throw ApiError.UnauthorizedError()
    }
    throw error;
})

export default $api;