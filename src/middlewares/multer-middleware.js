import multer from "multer";
import fs from "fs";

const allowedExtensions = [".jpg", ".jpeg", ".png"];

export const uploadSingleFile = (fieldName) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `public/${fieldName}s`);
            },
            filename: (req, file, cb) => {
                const timestamp = new Date().getTime();
                const originalname = file.originalname;
                const filename = `${originalname}-${timestamp}`;
                const filepath = `public/${fieldName}s/${filename}`;
                fs.access(filepath, (err) => {
                    if (!err) {
                        fs.unlinkSync(filepath);
                    }
                    cb(null, filename);
                });
            },
        }),
        limits: {
            // fileSize: 10 * 1024,
            fileSize: 3 * 1000 * 1000,
        },
        fileFilter: (req, file, cb) => {
            const extension = file.originalname.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(`.${extension}`)) {
                const error = new Error("File type not allowed");
                error.code = "FILE_TYPE_NOT_ALLOWED";
                return cb(error, false);
            }
            cb(null, true);
        },
    }).single(fieldName);
};

export const uploadImage = (fieldName, maxCount) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `public/${fieldName}s`);
            },
            filename: (req, file, cb) => {
                const timestamp = new Date().getTime();
                const originalname = file.originalname;
                const filename = `${originalname}-${timestamp}`;
                const filepath = `public/${fieldName}s/${filename}`;
                fs.access(filepath, (err) => {
                    if (!err) {
                        fs.unlinkSync(filepath);
                    }
                    cb(null, filename);
                });
            },
        }),
        limits: {
            // fileSize: 10 * 1024,
            fileSize: 3 * 1000 * 1000,
        },
        fileFilter: (req, file, cb) => {
            const extension = file.originalname.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(`.${extension}`)) {
                const error = new Error("File type not allowed");
                error.code = "FILE_TYPE_NOT_ALLOWED";
                return cb(error, false);
            }
            cb(null, true);
        },
    }).array(fieldName, maxCount);
};
