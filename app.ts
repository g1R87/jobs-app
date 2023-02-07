import cors from "cors";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import { config } from "./config/default";
import connectDB from "./db/connect";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import appRouter from "./routes/index";

const app = express();

app.use(cors());
app.use(helmet());
app.set("tryst proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 60,
    max: 250,
  })
);
app.use(express.json());

app.use("/api/v1", appRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = config.port || 3000;

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
