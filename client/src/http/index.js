import axios from "axios";

const $host = axios.create({
    baseURL:'http://localhost:5000/'
})

const $authhost = axios.create({
    baseURL:'http://localhost:5000/'

})

const authInterceptor = config =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
$authhost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authhost
}