import express from "express";
import cors from "cors";
import authRouter from "./src/router/authRouter.js";
import { connectDB } from "./src/config/configDataBase.js";
import dotenv from "dotenv";
import { responseMiddleWare } from "./src/middleware/responseMiddleWare.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3002;

app.use("/auth", authRouter);
app.use(responseMiddleWare);

app.listen(PORT, (res, req) => {
  console.log(`Start Port ${PORT} `);
});
connectDB();
