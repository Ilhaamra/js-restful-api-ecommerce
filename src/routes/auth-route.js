import express from "express";
import authController from "../controllers/auth-controller.js";

const authRouter = new express.Router();
authRouter.post("/auth/register", authController.register);
authRouter.post("/auth/login", authController.login);

export { authRouter };
