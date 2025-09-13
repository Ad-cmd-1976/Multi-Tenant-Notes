import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();
const port=process.env.PORT || 8080;

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.send("Status: Ok!");
})

app.listen(port, ()=>{
    console.log(`Listening at: ${port}`);
})