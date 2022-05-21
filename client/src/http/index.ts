import axios from 'axios';

export const API_URL = `https://jsonplaceholder.typicode.com/todos?_limit=10`
// export const API_URL = `http://localhost:5000/api`

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
