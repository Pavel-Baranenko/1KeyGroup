import axios from "axios";


export const API_URL = "https://rest.1key.group"
// export const API_URL = "http://localhost:5000"

const $api = axios.create({
  baseURL: API_URL,
})


$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
  return config;
})

export default $api;