import jwt from "jsonwebtoken";
import config from "../config/config";

export const signJwt = async (payload: object) => {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "12h" });
  return token;
};
