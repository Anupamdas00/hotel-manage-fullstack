import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./router/users";
import authRouter from "./router/auth";
import cookiesParser from "cookie-parser"

mongoose
  .connect(`${process.env.MONGODB_CONNECTION_STRING}/hotel-management`)
  .catch((err) => console.log(err));

const app = express();

app.use(cookiesParser())
app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/users", authRouter);

app.listen(7000, () => {
  console.log("Server has started!");
});
