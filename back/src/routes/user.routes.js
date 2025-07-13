import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import { login, register, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allUsers", authenticateToken, getUsers);

export default router;
