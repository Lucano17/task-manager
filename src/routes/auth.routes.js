import { Router } from "express";
import { login, register, logout, profile, verifyToken, updateProfile, deleteUser, getUserTasksCount } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, updateProfileSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);
router.put("/profile", authRequired, validateSchema(updateProfileSchema), updateProfile);
router.get("/tasks-count", authRequired, getUserTasksCount);
router.delete("/profile/:id", authRequired, deleteUser);

export default router;
