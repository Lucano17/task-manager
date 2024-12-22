import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import taskRoutes from "./routes/task.routes.js"
import cors from "cors"

const app = express();

app.use(cors({
    origin: `${process.env.APP_URL}`,
    credentials: true
}))
app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)
app.use(taskRoutes)

export default app;