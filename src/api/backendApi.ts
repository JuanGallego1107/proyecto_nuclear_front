import axios from 'axios'

export const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
})

console.log(import.meta)
