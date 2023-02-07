import "dotenv/config";

const port = parseInt(process.env.port as string, 10);

const accessTokenKey = process.env.JWT_SECRET as string;
export const config = {
  port,
  accessTokenKey,
};
