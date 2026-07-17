import express from "express";
import TempRouter from "./Rest-API/Routes/temp.route.ts";

const app = express();

app.use(express());
app.use(cookieParser());
app.use("/", TempRouter);
export default app;
