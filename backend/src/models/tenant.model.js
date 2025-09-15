import mongoose from 'mongoose';

const TenantSchema=new mongoose.Schema({
    tenantName:{
        type:String,
        enum: ["Acme", "Globex"],
        required:true,
        unique:true
    },
},{
    timestamps: true
});

const TenantModel=mongoose.model("tenant", TenantSchema);
export default TenantModel;