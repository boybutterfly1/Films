import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL:'https://yts.mx/api/v2/',
    headers: {
        'Content-type': 'application/json'
    }
})

export default api