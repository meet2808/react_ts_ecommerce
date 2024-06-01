import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../routes/app.routes"

const app = express();

app.use(
    cors({ credentials : true})
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1", router);
// app.get("/", (res) => { return res.json( "Hello meet") })

export { app };