import express from "express";
import userController from "../controllers/user-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const userRouter = new express.Router();
userRouter.get("/user/me", authMiddleware, userController.me);
userRouter.patch("/user/setting", authMiddleware, userController.update);
userRouter.post("/user/upload", authMiddleware, userController.uploadProfile);

export { userRouter };
