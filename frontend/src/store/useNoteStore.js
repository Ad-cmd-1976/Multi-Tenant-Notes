import { create } from 'zustand';
import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

const useNoteStore=create((set,get)=>({
    notes:[],

    getAllNotes:async ()=>{
        try{
            const res=await axios.post('/note');
            set({ notes: res.data.notes });
        }
        catch(error){
            console.log("Error in getAllNotes function of note store", error);
            toast.error(error.response.data.message);
        }
    },

    createNote:async (noteData)=>{
        try{
            const res=await axios.post('/note/create', noteData);
            get().getAllNotes();
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in createNote function of note store", error);
            toast.error(error.response.data.message);
        }
    },
    
    deleteNote: async (noteId)=>{
        try{
            const res=await axios.delete(`/note/delete/${noteId}`);
            await get().getAllNotes();
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in deleteNote function of note store", error);
            toast.error(error.response.data.message);
        }
    },
    
    updateNote: async (noteId, noteData)=>{
        try{
            const res=await axios.patch('/note/update', { noteId, noteData });
            await get().getAllNotes();
            toast.success(res.data.message);
        }
        catch(error){
            console.log("Error in deleteNote function of note store", error);
            toast.error(error.response.data.message);
        }
    },
}));

export default useNoteStore;