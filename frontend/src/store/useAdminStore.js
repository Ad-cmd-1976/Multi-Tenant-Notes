import { create } from "zustand";
import axios from '../lib/axios.js';
import toast from "react-hot-toast";

const useAdminStore=create((set, get)=>({
    users:[],
    
    getUsers: async ()=>{
        try{
            const res=await axios.get('/admin/users');
            set({ users: res.data.users });
        }
        catch(error){
            console.log("Error in getUser function of admin store", error);
            toast.error(error?.response?.data?.message);
        }
    },
    
    addUser: async (formData)=>{
        try{
            const res=await axios.post('/admin/add-user', formData);
            get().getUsers();
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in addUser function of admin store", error);
            toast.error(error?.response?.data?.message);
        }
    },
    
    deleteUser: async (userId)=>{
        try{
            const res=await axios.delete(`/admin/delete/${userId}`);
            get().getUsers();
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in delete function of admin store", error);
            toast.error(error?.response?.data?.message);
        }
    },
}));

export default useAdminStore;