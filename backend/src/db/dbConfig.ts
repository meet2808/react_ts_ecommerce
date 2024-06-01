import mongoose from "mongoose";
import { conf } from "../../conf";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(conf.DB_URL);
        console.log(`Mongodb connected : ${connection.connection.host}`)
    } catch (error) {
        console.error(error);
    }
}
