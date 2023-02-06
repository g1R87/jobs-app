import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";
import User from "../model/user.model";
import { hashPassword } from "../utils/passwords";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //   if (!name || !email || !password) {
  //     throw new BadRequestError("wtf?");
  //   }

  const hashedPassword = await hashPassword(password);
  const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).send(user);
};

export const login = async (req: Request, res: Response) => {
  res.send("login user");
};
