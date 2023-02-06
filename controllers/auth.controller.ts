import "dotenv/config";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User, { UserInput } from "../model/user.model";

// interface User {
//   name?: string;
//   email?: string;
//   password?: string;
//   _id?: string;
//   __v?: number;
// }

export const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).send({ user: { name: user.name }, token });
};

export const login = async (req: Request, res: Response) => {
  res.send("login user");
};
