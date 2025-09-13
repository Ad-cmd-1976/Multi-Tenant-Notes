import { create } from 'zustand';
import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

const useAuthStore=create((set,get)=>({
    user:null,
    login:async (formData)=>{
        try{
            const res=await axios.post('/auth/login', formData);
            set({ user: res.data.user });
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in login function of useAuthStore", error);
            toast.error(error.response.data.message);
        }
    },
    
    logout:async ()=>{
        try{
            const res=await axios.post('/auth/logout');
            set({ user: '' });
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in logout function of useAuthStore", error);
            toast.error(error.response.data.message);
        }
    },

    checkAuth:async ()=>{
        try{
            const res=await axios.post('/auth/check-auth');
            set({ user: res.data.user });
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }
}));

export default useAuthStore;