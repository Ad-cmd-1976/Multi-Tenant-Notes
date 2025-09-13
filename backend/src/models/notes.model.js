import mongoose from 'mongoose';

const NoteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    tenant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tenant",
        required:true
    },
});

const NoteModel=mongoose.model("note", NoteSchema);
export default NoteModel;