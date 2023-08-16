import express from "express";
import { authRouter } from "./auth-route.js";
import { userRouter } from "./user-route.js";
import { categoryRouter } from "./category-route.js";
import { productRouter } from "./product-route.js";
import { addressRouter } from "./address-route.js";

const router = new express.Router();
router.use("/api", authRouter);
router.use("/api", userRouter);
router.use("/api", categoryRouter);
router.use("/api", productRouter);
router.use("/api", addressRouter);

export default router;
