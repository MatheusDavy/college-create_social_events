import axios from 'axios'

const baseURL = 'http://127.0.0.1/P2/backend'

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
