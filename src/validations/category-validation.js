import Joi from "joi";

const createCategoryValidation = Joi.object({
    category_name: Joi.string().max(100).required(),
});

const getCategoryValidation = Joi.number().positive().required();

const updateCategoryValidation = Joi.object({
    category_name: Joi.string().max(100).required(),
});

export { createCategoryValidation, updateCategoryValidation, getCategoryValidation };
