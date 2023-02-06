import { Router } from "express";
import authRouter from "./auth.route";
import jobsRouter from "./jobs.route";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/jobs", jobsRouter);

export default appRouter;
