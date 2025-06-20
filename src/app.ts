import express from "express";
import path from "path";
import session from "express-session";
import config from "./config/config";
import mainRoutes from "./routes/main";
import authRoutes from "./routes/auth";
import recipeRoutes from "./routes/recipe";
import restRouter from "./routes/api";
import fs from "fs";
import {
  passPrefixToLocals,
  passQueryToLocals,
  userMiddleware,
} from "./middleware/requestFiller";
import { UserRole } from "./types/user";

declare module "express-session" {
  interface SessionData {
    user?: {
      email: string;
      fullName: string;
      role: UserRole;
    } | null;
  }
}

declare module "express" {
  export interface Request {
    user?: {
      fullName: string;
      email: string;
      role: "ADMIN" | "USER";
      id: number;
    } | null;
  }
}

const app = express();
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(userMiddleware);
app.use(passQueryToLocals);
app.use(passPrefixToLocals);

app.set("views", path.join(__dirname, "/views"));

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/api", restRouter);
app.use("/recipe", recipeRoutes);
app.use("/", authRoutes);
app.use("/", mainRoutes);

export default app;
