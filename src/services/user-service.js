import bcrypt from "bcrypt";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import { updateAvatarValidation, updateUserValidation } from "../validations/user-validation.js";
import { validate } from "../validations/validation.js";
import { uploadAvatar } from "../middlewares/multer-middleware.js";
import multer from "multer";

const me = async (userId) => {
    if (!userId) {
        throw new ResponseError(401, "Unauthorized");
    }
    const user = await prismaClient.user.findUnique({
        where: {
            user_key: userId,
        },
        select: {
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
            avatar: true,
            addresses: {
                select: {
                    address_key: true,
                    address_name: true,
                    street: true,
                    city: true,
                    province: true,
                    country: true,
                    postalcode: true,
                },
            },
        },
    });
    return user;
};

const update = async (request, userId) => {
    const userRegister = validate(updateUserValidation, request);
    const existingUser = await prismaClient.user.findUnique({
        where: {
            user_key: userId,
        },
    });
    if (!existingUser) {
        throw new ResponseError(404, "User not found");
    }
    const data = {};
    if (userRegister.first_name) {
        data.first_name = userRegister.first_name;
    }
    if (userRegister.last_name) {
        data.last_name = userRegister.last_name;
    }
    if (userRegister.email) {
        data.email = userRegister.email;
    }
    if (userRegister.password) {
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(userRegister.password, salt);
    }
    if (userRegister.phone) {
        data.phone = userRegister.phone;
    }

    return prismaClient.user.update({
        where: {
            user_key: existingUser.user_key,
        },
        data: data,
        select: {
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        },
    });
};

const uploadProfile = async (avatar, userId) => {
    avatar = validate(updateAvatarValidation, avatar);
    return prismaClient.user.update({
        where: {
            user_key: userId,
        },
        data: {
            avatar: avatar,
        },
        select: {
            avatar: true,
        },
    });
};

export default { me, update, uploadProfile };
