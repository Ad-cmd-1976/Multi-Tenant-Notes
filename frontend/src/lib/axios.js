import axios from 'axios';

const axiosInstance=axios.create({
    baseURL: import.meta.env.MODE==="development" ? "http://localhost:8080" : "https://multi-tenant-notes-api.vercel.app",
    withCredentials:true,
});

export default axiosInstance;