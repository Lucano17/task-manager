import { Router } from "express";
import { login, register, logout, profile, verifyToken, updateProfile, deleteUser, getUserTasksCount } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, updateProfileSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", verifyToken, logout);
router.get("/verify", verifyToken);
router.get("/profile", auth, profile);
router.put("/profile", auth, validateSchema(updateProfileSchema), updateProfile);
router.get("/tasks-count", auth, getUserTasksCount);
router.delete("/profile/:id", auth, deleteUser);

export default router;
