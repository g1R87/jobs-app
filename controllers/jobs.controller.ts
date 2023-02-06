import { Request, Response } from "express";

export const getAllJobs = async (req: Request, res: Response) => {
  res.send("get jobs");
};

export const getJob = async (req: Request, res: Response) => {
  res.send("get 1 jobs");
};

export const createJob = async (req: Request, res: Response) => {
  res.send("make jobs");
};
export const updateJob = async (req: Request, res: Response) => {
  res.send("update jobs");
};

export const deleteJob = async (req: Request, res: Response) => {
  res.send("delete jobs");
};
