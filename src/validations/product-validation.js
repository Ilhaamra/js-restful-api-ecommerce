import Joi from "joi";

const createProductValidation = Joi.object({
    product_name: Joi.string().max(200).required(),
    price: Joi.number().required(),
    quantity: Joi.number().default(0).required(),
    description: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    categoryId: Joi.number().positive().optional(),
});

const getProductValidation = Joi.number().positive().required();

const updateProductValidation = Joi.object({
    id: Joi.number().positive().required(),
    product_name: Joi.string().max(200).optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional(),
    description: Joi.string().allow("").optional(),
});

const updateProductCategoryValidation = Joi.object({
    id: Joi.number().positive().required(),
    categoryId: Joi.number().positive().required(),
});

const searchProductValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).max(100).positive().default(5),
    name: Joi.string().optional(),
    price: Joi.string().optional(),
    categoryId: Joi.number().positive().optional(),
});

export {
    createProductValidation,
    updateProductValidation,
    updateProductCategoryValidation,
    searchProductValidation,
    getProductValidation,
};
