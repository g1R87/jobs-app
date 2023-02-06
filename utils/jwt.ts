import { Jwt, sign, verify } from "jsonwebtoken";

export const createToken = (
  payload: any,
  secret: string,
  options?: any
): string => {
  return sign(payload, secret, options);
};

export const verifyToken = (
  token: string,
  secret: string,
  options?: any
): Jwt => {
  return verify(token, secret, options);
};
