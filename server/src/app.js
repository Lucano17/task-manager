import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import taskRoutes from "./routes/task.routes.js"
import cors from "cors"

const app = express();


app.use(cors({
    origin: ["http://localhost:5173", "https://task-manager-sigma-two-21.vercel.app"],
    credentials: true
}))
app.use((req, res, next) => {
    if (req.method === "HEAD") {
      res.status(200).end();
    } else {
      next();
    }
  });
  app.use((req, res, next) => {
    console.log("Cookies:", req.cookies);
    console.log("Headers:", req.headers);
    next();
});
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", taskRoutes)

export default app;