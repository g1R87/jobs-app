import { Request, Response } from "express";

export const getAllJobs = async (req: Request, res: Response) => {
  res.send("get jobs");
};

export const getJob = async (req: Request, res: Response) => {
  res.json((req as any).user);
};

export const createJob = async (req: Request, res: Response) => {
  const { name, userId } = res.locals.user;
  res.json({ name, userId });
};
export const updateJob = async (req: Request, res: Response) => {
  res.json((req as any).user);
};

export const deleteJob = async (req: Request, res: Response) => {
  res.send("delete jobs");
};
