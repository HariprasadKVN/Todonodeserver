require('dotenv').config();
const mongoose=require('mongoose');
const uri=process.env.MONGO_URI;
const connectDB= async ()=>{
    const conn = await mongoose.connect(uri,)
    
    console.log(`MongoDB connected : ${conn.connection.host} ${conn.connection.db.databaseName}`)
}

module.exports=connectDB;