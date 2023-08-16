import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import addressController from "../controllers/address-controller.js";

const addressRouter = new express.Router();

addressRouter.post("/address", authMiddleware, addressController.create);
addressRouter.put("/address/:addressId", authMiddleware, addressController.update);
addressRouter.get("/address/:addressId", authMiddleware, addressController.getOne);
addressRouter.delete("/address/:addressId", authMiddleware, addressController.remove);

export { addressRouter };
