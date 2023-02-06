import { Request, Response } from "express";

const notFound = (req: Request, res: Response) =>
  res.status(404).send("Route doesnot exist");

export default notFound;
