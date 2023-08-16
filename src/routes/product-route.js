import express from "express";
import productController from "../controllers/product-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const productRouter = new express.Router();

productRouter.post("/product", authMiddleware, productController.create);
productRouter.get("/product", authMiddleware, productController.searchProduct);
productRouter.put("/product/:productId", authMiddleware, productController.update);
productRouter.put("/product/category/:productId", authMiddleware, productController.updateCategory);
productRouter.delete("/product/:productId", authMiddleware, productController.remove);

export { productRouter };
