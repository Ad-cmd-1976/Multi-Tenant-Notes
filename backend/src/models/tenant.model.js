import mongoose from 'mongoose';

const TenantSchema=new mongoose.Schema({
    tenantName:{
        type:String,
        required:true,
        unique:true
    },
    adminName:{
        type:String,
        required:true,
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    }],
    notes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "note"
    }]
});

const TenantModel=mongoose.model("tenant", TenantSchema);
export default TenantModel;