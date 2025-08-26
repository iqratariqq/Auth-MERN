import mongoose from "mongoose";

export const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connect successfully")
        
    } catch (error) {
        console.error("internal server error",error)
        process.exit(1);
        
    }
}

