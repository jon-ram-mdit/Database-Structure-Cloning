import jwt from "jsonwebtoken";
import config from "../config";

export const createToken = (data: any) => {
  return jwt.sign(data, config.SECRET, { expiresIn: config.tokenExpireTime });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.SECRET);
};
