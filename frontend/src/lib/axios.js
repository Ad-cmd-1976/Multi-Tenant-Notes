import axios from 'axios';

const axiosInstance=axios.create({
    baseURL: import.meta.env.VITE_MODE==="development" ? "http://localhost:8080" : "https://multi-tenant-notes.onrender.com",
    withCredentials:true,
});

export default axiosInstance;