import "dotenv/config";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import connectDB from "./db/connect";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import appRouter from "./routes/index";

const app = express();

app.use(express.json());

app.use("/api/v1", appRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port || 3000;

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
