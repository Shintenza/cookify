import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import session from "express-session";
import config from "./config/config";
import mainRoutes from "./routes/main";

declare module "express-session" {
  interface SessionData {
    user?: {
      username: string;
    };
  }
}

const app = express();
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session?.user ?? null;
  next();
});

app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home/index", { title: "Home Page" });
});

app.use("/", mainRoutes);

export default app;
