import { prismaClient } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import {
    createCategoryValidation,
    updateCategoryValidation,
} from "../validations/category-validation.js";
import { validate } from "../validations/validation.js";

const create = async (request) => {
    const category = validate(createCategoryValidation, request);
    return prismaClient.category.create({
        data: category,
        select: {
            category_name: true,
        },
    });
};

const update = async (id, request) => {
    const category = validate(updateCategoryValidation, request);
    const existCategory = await prismaClient.category.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!existCategory) {
        throw new ResponseError(404, "Category is not found");
    }
    return prismaClient.category.update({
        where: {
            id: existCategory.id,
        },
        data: {
            category_name: category.category_name,
        },
        select: {
            category_name: true,
        },
    });
};

const get = async () => {
    return prismaClient.category.findMany();
};

export default { create, update, get };
