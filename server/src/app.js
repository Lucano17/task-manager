import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: 'https://task-manager-sigma-two-21.vercel.app', // Tu dominio permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions));
app.post('/api/login', (req, res) => {
  // Lógica para manejar login
  res.json({ message: 'Login exitoso' });
});
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
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
