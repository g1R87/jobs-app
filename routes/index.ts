import { Router } from "express";
import authMiddleware from "../middleware/authentication";
import authRouter from "./auth.route";
import jobsRouter from "./jobs.route";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/jobs", authMiddleware, jobsRouter);

export default appRouter;
