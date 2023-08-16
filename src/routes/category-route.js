import express from "express";
import categoryController from "../controllers/category-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const categoryRouter = new express.Router();

categoryRouter.post("/category", authMiddleware, categoryController.create);
categoryRouter.get("/category", authMiddleware, categoryController.get);
categoryRouter.put("/category/:id", authMiddleware, categoryController.update);

export { categoryRouter };
