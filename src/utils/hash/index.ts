// import argon from "argon2";
import bcrypt from "bcrypt";

import config from "../../config";
import { ErrorGenerator } from "../../constant/errorMessages";

const SECRET = config.SECRET;

export const getHash = async (data: string) => {
  try {
    return await bcrypt.hash(data, 10);
  } catch (err) {
    console.log(err);
    throw new ErrorGenerator("Something Went Wrong");
  }
};

export const verifyHash = async (hash: string, data: string) => {
  try {
    return await bcrypt.compare(data,hash);
  } catch (err) {
    console.log("bcrypt error is: ", err);
    throw new ErrorGenerator("Unauthorized");
  }
};
