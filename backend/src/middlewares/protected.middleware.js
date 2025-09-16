import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export const protectedRoute=async (req, res, next)=>{
    try{
        const { accessToken }=req.cookies;
        if(!accessToken)  return res.status(400).json({ message: "Login to use the services!" });
        try{
            const decoded=jwt.verify(accessToken, process.env.JWT_SECRET);

            if(!decoded.userId) return res.status(401).json({ message:"Invalid Token!" });

            const user=await UserModel.findById(decoded.userId).select("-password");
            if(!user) return res.status(401).json({ message:"User Not Found!"});
            req.user=user;
            return next();
        }
        catch(error){ 
            console.log(error);
            return res.status(401).json({ message:"Please login again from homepage!" }) 
        };
    }
    catch(error){
        console.log("Error in protectedRoute middleware:",error.message);
        return res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const adminRoute= async (req, res, next)=>{
    try{
        const user=req.user;
        if(user.role==="admin") return next();
        else return res.status(401).json({ message: "Unauthorized" });
    }
    catch(error){
        console.log("Error in adminRoute middleware:",error);
        return res.status(500).json({ message:"Internal Server Error!" });
    }
}