import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from '../src/lib/db.js';
import authRoutes from './routes/auth.route.js';
import noteRoutes from './routes/note.route.js';
import adminRoutes from './routes/admin.route.js';
dotenv.config();

const app=express();
const port=process.env.PORT || 8080;

app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/note', noteRoutes);
app.use('/admin', adminRoutes);

app.get("/", (req,res)=>{
    res.send("Status: Ok!");
})

app.listen(port, ()=>{
    console.log(`Listening at port: ${port}`);
    connectDb();
})

export default app;