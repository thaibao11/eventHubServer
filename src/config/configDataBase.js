import mongoose from "mongoose";

export const connectDB = async () => {
  console.log(process.env.DATABASE_URI);
  await mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};
