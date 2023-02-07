import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";
import NotFoundError from "../errors/not-found";
import Jobs from "../model/jobs.model";

//read
export const getAllJobs = async (req: Request, res: Response) => {
  console.log(res.locals.user.userId);
  const jobs = await Jobs.find({ createdBy: res.locals.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ Hits: jobs.length, jobs });
};

export const getJob = async (req: Request, res: Response) => {
  const { userId } = res.locals.user;
  const { id: jobId } = req.params;

  const job = await Jobs.findOne({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`No job with ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

//create
export const createJob = async (req: Request, res: Response) => {
  const { name, userId } = res.locals.user;
  const job = await Jobs.create({ ...req.body, createdBy: userId });
  res.status(StatusCodes.CREATED).send({ job });
};

//update
export const updateJob = async (req: Request, res: Response) => {
  const { userId } = res.locals.user;
  const {
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (company == "" || position == "") {
    throw new BadRequestError("position or company cannot be empty");
  }

  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) throw new NotFoundError(`No job with ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

//delete
export const deleteJob = async (req: Request, res: Response) => {
  const { userId } = res.locals.user;
  const { id: jobId } = req.params;

  const job = await Jobs.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) throw new NotFoundError(`No job with ${jobId}`);

  res.status(StatusCodes.OK).json({ msg: "success", job });
};
