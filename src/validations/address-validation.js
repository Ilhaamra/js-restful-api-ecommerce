import Joi from "joi";

const createAddressValidation = Joi.object({
    address_name: Joi.string().max(100).required(),
    street: Joi.string().max(200).required(),
    city: Joi.string().max(50).required(),
    province: Joi.string().max(50).required(),
    country: Joi.string().max(50).required(),
    postalcode: Joi.string().max(15).optional().allow(""),
});

const getAddressValidation = Joi.string().max(255).required();

const updateAddressValidation = Joi.object({
    address_key: Joi.string().max(255).required(),
    address_name: Joi.string().max(100).optional(),
    street: Joi.string().max(200).optional(),
    city: Joi.string().max(50).optional(),
    province: Joi.string().max(50).optional(),
    country: Joi.string().max(50).optional(),
    postalcode: Joi.string().max(15).optional(),
});

export { createAddressValidation, updateAddressValidation, getAddressValidation };
