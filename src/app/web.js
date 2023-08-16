import express from "express";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import Router from "../routes/index.js";

export const web = express();
web.use(express.json());

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(cookieParser());
web.use(Router);
web.use(errorMiddleware);
