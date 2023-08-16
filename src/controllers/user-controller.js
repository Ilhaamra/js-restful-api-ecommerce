import multer from "multer";
import { uploadSingleFile } from "../middlewares/multer-middleware.js";
import userService from "../services/user-service.js";

const me = async (req, res, next) => {
    try {
        const result = await userService.me(req.userId);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await userService.update(req.body, user.user_key);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const uploadProfile = async (req, res, next) => {
    uploadSingleFile("avatar")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                errors: err.message,
            });
        } else if (err) {
            if (err.code === "FILE_TYPE_NOT_ALLOWED") {
                return res.status(400).json({
                    errors: "File type not allowed",
                });
            }
            return res.status(400).json({
                errors: err.message,
            });
        }
        try {
            const files = req.file;
            const result = await userService.uploadProfile(files.path, req.userId);
            res.status(200).json({
                data: result,
            });
        } catch (error) {
            next(error);
        }
    });
};

export default { me, update, uploadProfile };
