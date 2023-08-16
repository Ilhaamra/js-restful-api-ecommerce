import Joi from "joi";

const updateUserValidation = Joi.object({
    first_name: Joi.string().max(50).optional(),
    last_name: Joi.string().max(50).optional(),
    email: Joi.string().max(50).optional(),
    password: Joi.string().max(50).optional(),
    phone: Joi.string().max(20).optional(),
});

const updateAvatarValidation = Joi.string().max(200).optional();

export { updateUserValidation, updateAvatarValidation };
