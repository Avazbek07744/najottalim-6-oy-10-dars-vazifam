import axios from "axios"


const https = axios.create({
    baseURL: "https://trello.vimlc.uz/api"
})
https.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorizzation = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)




export default https;