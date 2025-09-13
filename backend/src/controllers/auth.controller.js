import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken=(userId)=>{
    const token=jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
}

const storeCookies=(accessToken,res)=>{
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV=="production",
        sameSite: process.env.NODE_ENV==="production" ? "none": "lax",
        path: '/',
        maxAge: 7*24*60*60*1000
    })
}

export const login=async (req,res)=>{
    try{
        const { email, password }=req.body;
        if(!email || !password) return res.status(401).json({ message:"All fields Required!" });
        
        const existingUser=await UserModel.findOne({ email }).select("-password");
        if(!existingUser) return res.status(404).json({ message:"User not found!" });

        const accessToken=generateToken(existingUser._id);
        storeCookies(accessToken, res);
        return res.status(201).json({
            message:"Login Successfull!",
            user: existingUser
        });
    }
    catch(error){
        console.log("Error in login function of auth controller", error);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const logout=async (req,res)=>{
    try{
        res.clearCookie("accessToken", {
            httpOnly:true,
            sameSite:process.env.NODE_ENV==="production" ? "none" : "lax",
            secure: process.env.NODE_ENV==="production",
            path:'/'
        });
        return res.status(201).json({ message:"Logged Out Successfully!" });
    }
    catch(error){
        console.log("Error in login function of auth controller", error);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}

export const checkAuth=(req,res)=>{
    try{
        return res.status(201).json({ user: req.user });
    }
    catch(error){
        console.log("Error in checkAuth function of auth controller", error);
        res.status(500).json({ message:"Internal Server Error!" });
    }
}