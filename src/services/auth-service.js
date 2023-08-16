import { loginValidation, registerValidation } from "../validations/auth-validation.js";
import { validate } from "../validations/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../app/environtment.js";

const register = async (request) => {
    const user = validate(registerValidation, request);
    const existEmail = await prismaClient.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (existEmail) {
        throw new ResponseError(400, "Email already exists");
    }

    const existNumber = await prismaClient.user.findUnique({
        where: {
            phone: user.phone,
        },
    });
    if (existNumber) {
        throw new ResponseError(400, "Number phone already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashPassword;

    console.log(user);
    return prismaClient.user.create({
        data: user,
        select: {
            first_name: true,
            email: true,
        },
    });
};

const login = async (request) => {
    const loginRequest = validate(loginValidation, request);
    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email,
        },
    });
    if (!user) {
        throw new ResponseError(401, "Email or Password wrong");
    }
    const pwMatches = await bcrypt.compare(loginRequest.password, user.password);
    if (!pwMatches) {
        throw new ResponseError(401, "Email or Password wrong");
    }
    return signToken(user.user_key, user.role);
};

const signToken = (user_key, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {
                sub: user_key,
                role,
            };
            const token = jwt.sign(payload, config.JWT_SECRET, {
                expiresIn: "1d",
            });
            resolve({
                access_token: token,
            });
        } catch (error) {
            reject(error);
        }
    });
};

export default { register, login };
