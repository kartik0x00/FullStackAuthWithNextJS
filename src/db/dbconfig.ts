import mongoose from "mongoose";

export async function connect(){

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on("connected", ()=>{
            console.log("Database connected successfully");
        });

        connection.on("error", (err)=>{
            console.log("Error in Database connection", err);
        });

    } catch (error) {
        console.log("Error in Database connection", error);
    }
}