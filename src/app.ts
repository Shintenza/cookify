import express from "express";
import path from "path";
import session from "express-session";
import config from "./config/config";
import mainRoutes from "./routes/main";
import authRoutes from "./routes/auth";
import recipeRoutes from "./routes/recipe";
import fs from "fs";
import { passQueryToLocals, userMiddleware } from "./middleware/userData";

declare module "express-session" {
  interface SessionData {
    user?: {
      email: string;
      fullName: string;
    };
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

app.set("views", path.join(__dirname, "/views"));

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/recipe", recipeRoutes);
app.use("/", mainRoutes);
app.use("/", authRoutes);

export default app;
