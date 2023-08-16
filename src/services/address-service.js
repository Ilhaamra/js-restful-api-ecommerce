import { prismaClient } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import {
    createAddressValidation,
    getAddressValidation,
    updateAddressValidation,
} from "../validations/address-validation.js";
import { validate } from "../validations/validation.js";

const create = async (userId, request) => {
    const address = validate(createAddressValidation, request);
    address.userId = userId;

    return prismaClient.address.create({
        data: address,
        select: {
            address_name: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalcode: true,
        },
    });
};

const update = async (userId, request) => {
    const address = validate(updateAddressValidation, request);

    const existAddress = await prismaClient.address.count({
        where: {
            userId: userId,
            address_key: address.address_key,
        },
    });
    if (existAddress !== 1) {
        throw new ResponseError(404, "Address is not found");
    }
    return prismaClient.address.update({
        where: {
            address_key: address.address_key,
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postalcode: address.postalcode,
        },
        select: {
            address_name: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalcode: true,
        },
    });
};

const remove = async (userId, addressKey) => {
    addressKey = validate(getAddressValidation, addressKey);
    const existAddress = await prismaClient.address.count({
        where: {
            userId: userId,
            address_key: addressKey,
        },
    });
    if (existAddress !== 1) {
        throw new ResponseError(404, "Address is not found");
    }
    return prismaClient.address.delete({
        where: {
            address_key: addressKey,
        },
    });
};

const getOne = async (userId, addressKey) => {
    addressKey = validate(getAddressValidation, addressKey);

    const address = await prismaClient.address.findFirst({
        where: {
            userId: userId,
            address_key: addressKey,
        },
        select: {
            address_key: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postalcode: true,
        },
    });
    if (!address) {
        throw new ResponseError(404, "Address is not found");
    }
    return address;
};

export default { create, update, remove, getOne };
