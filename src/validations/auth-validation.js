import Joi from "joi";

const registerValidation = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).allow(null, "").optional(),
    email: Joi.string().max(50).required().email(),
    password: Joi.string().max(50).required(),
    phone: Joi.string()
        .max(20)
        .allow(null, "")
        .pattern(/^[0-9]+$/)
        .optional(),
    role: Joi.string().valid("Admin", "Customer", "Merchant").default("Customer"),
    avatar: Joi.string().allow(null, "").optional(),
});

const loginValidation = Joi.object({
    email: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
});

export { registerValidation, loginValidation };
