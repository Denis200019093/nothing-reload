import axios from 'axios';

export const API_URL = `http://localhost:8080`

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((config: any) => {
    
    // if ( config.url.includes('/login') || config.url.includes('/registration') || (!config.url.includes('/posts') && !config.method.includes('get') ) {
    //     return config
    // } else {
    //     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    // }
    // console.log();

    // if ( config.url.includes('/login') || config.url.includes('/registration') || (config.url.includes('/posts') && config.method.includes('get')) ) {
    //     return 
    // } else {
    //     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    // }
    
    if ( !config.url.includes('/login') || !config.url.includes('/registration') || (!config.url.includes('/posts') && !config.method.includes('get')) ) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        console.log('ROken');
        
    }
    
    return config;
})