import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/passwords";

export interface UserInput extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createJWT(): string;
  checkPassword(password: string): boolean;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Provide a valid email!",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minglegth: 6,
  },
});

//pre middleware
UserSchema.pre("save", async function () {
  this.password = await hashPassword(this.password);
  //   next(); not required since mongoose 5
});

//instance methods
UserSchema.methods.createJWT = function (this: UserInput) {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.checkPassword = async function (
  password: string
): Promise<boolean> {
  return await verifyPassword(password, this.password);
};

export default mongoose.model<UserInput>("User", UserSchema);
