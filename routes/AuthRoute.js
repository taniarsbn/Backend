import express from "express";
import { login, Logout, Me, register, updateUser } from "../controllers/Auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/user/:id", updateUser);
router.get("/me", Me);
router.delete("/logout", Logout);

export default router;