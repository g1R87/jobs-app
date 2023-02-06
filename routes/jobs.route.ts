import { Router } from "express";
import * as jobsController from "../controllers/jobs.controller";

const jobsRouter = Router();

jobsRouter
  .route("/")
  .post(jobsController.createJob)
  .get(jobsController.getAllJobs);
jobsRouter
  .route("/:id")
  .get(jobsController.getJob)
  .delete(jobsController.deleteJob)
  .patch(jobsController.updateJob);

export default jobsRouter;
