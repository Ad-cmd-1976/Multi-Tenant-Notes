import TenantModel from '../models/tenant.model.js';
import NoteModel from '../models/notes.model.js';

export const getAllNotes=async (req, res)=>{
    try{
        const user=req.user;
        const notes=await NoteModel.find({ tenant:user.tenant });
        return res.status(201).json({
            notes: notes
        });
    }
    catch(error){
        console.log("Error in getAllNotes function of notes controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const createNote=async (req, res)=>{
    try{
        const user=req.user;
        const { title, content }=req.body;
        if(!title || !content) return res.status(400).json({ message: "All fileds required!" });
        await NoteModel.create({ title: title, content: content, tenant: user.tenant, createdBy: user._id });

        return res.status(201).json({ message:"Note created Successfully!" });
    }
    catch(error){
        console.log("Error in createNote function of notes controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const deleteNote=async (req, res)=>{
    try{
        console.log(req.params);
        const { id }=req.params;
        await NoteModel.findByIdAndDelete(id);

        return res.status(201).json({ message:"Note deleted Successfully!" });
    }
    catch(error){
        console.log("Error in deleteNote function of notes controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const updateNote=async (req, res)=>{
    try{
        const { noteId, noteData }=req.body;
        await NoteModel.findByIdAndUpdate(noteId, { title: noteData.title, content: noteData.content });
        
        return res.status(201).json({ message: "Note Updated Successfully! "});
    }
    catch(error){
        console.log("Error in updateNote function of notes controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}