import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const getAllUsers=async (req, res)=>{
    try{
        const user=req.user;
        const users=await UserModel.find({ tenant: user.tenant, _id: { $ne: user._id } }).select("-password");

        return res.status(201).json({
            users: users
        })
    }
    catch(error){
        console.log("Error in getAllUsers function of admin controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const addUser=async (req, res)=>{
    try{
        const user=req.user;
        const { email, password, role }=req.body;
        if(!email || !password || !role) return res.status(400).json({ message:"All Fields are Required!" });

        const existingUser=await UserModel.findOne({ email: email });
        if(existingUser) return res.status(400).json({ message:"User Already exists!" });

        const hashedPassword=await bcrypt.hash(password, 10);

        await UserModel.create({ email: email, password: hashedPassword, role:role, tenant: user.tenant});

        return res.status(201).json({ message: "User added Successfully" });
    }
    catch(error){

    }
}

export const deleteUser=async (req, res)=>{
    try{
        const { id }=req.params;
        await UserModel.findByIdAndDelete(id);
        
        return res.status(201).json({ message: "User Removed Successfully! "});
    }
    catch(error){
        console.log("Error in deleteUser function of admin controller", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}