import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  sessionSecret: string;
  jwtSecret: string;
  prefix: string;
};

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  sessionSecret: process.env.SESSION_SECRET ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  prefix: process.env.PATH_PREFIX ?? "/",
};

export default config;
