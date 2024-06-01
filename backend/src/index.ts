import { app } from "./app";
import { conf } from "../conf";
import { connectDB } from "./db/dbConfig";

connectDB()
    .then(() => {
        console.log("DB connected successfully.");
        app.listen(conf.PORT, () => {
            console.log(`Server is running on port ${conf.PORT}`);
        })
    })
    .catch((error) => { console.log(error) })