import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async ()=>{
    try {
        await mongoose.connect (process.env.MONGODB_URI);
        console.log(">>> Database is connected to MongoDB Atlas");
    }
    catch(error){
        console.log("Error al conectarse en la base de datos")
        console.log(error);
    }
};

