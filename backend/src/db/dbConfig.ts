import mongoose from "mongoose";
import { conf } from "../../conf";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(conf.DB_URL, {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
        });
        console.log(`Mongodb connected : ${connection.connection.host}`)
    } catch (error) {
        console.error(error);
    }
}
