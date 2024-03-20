require('dotenv').config();
const mongoose=require('mongoose');
const uri=process.env.MONGO_URI;
const connectDB= async ()=>{
    const conn = await mongoose.connect("mongodb+srv://reactuser:welcomereactuser@financecluster.qhjl565.mongodb.net/?retryWrites=true&w=majority")
    console.log(`MongoDB connected : ${conn.connection.host}`)
}

module.exports=connectDB;