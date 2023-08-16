import { prismaClient } from "../app/database.js";
import { ResponseError } from "../errors/response-error.js";
import {
    createProductValidation,
    getProductValidation,
    searchProductValidation,
    updateProductCategoryValidation,
    updateProductValidation,
} from "../validations/product-validation.js";
import { validate } from "../validations/validation.js";

const create = async (userId, request) => {
    const product = validate(createProductValidation, request);
    product.merchantId = userId;

    return prismaClient.product.create({
        data: product,
    });
};

const update = async (userId, request) => {
    const product = validate(updateProductValidation, request);
    const existProduct = await prismaClient.product.count({
        where: {
            merchantId: userId,
            id: product.id,
        },
    });
    if (existProduct !== 1) {
        throw new ResponseError(404, "Product is not found");
    }
    return prismaClient.product.update({
        where: {
            id: product.id,
        },
        data: {
            product_name: product.product_name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
        },
        select: {
            id: true,
            product_name: true,
            price: true,
            quantity: true,
            description: true,
            image: true,
        },
    });
};

const updateCategory = async (userId, request) => {
    const product = validate(updateProductCategoryValidation, request);

    const existProduct = await prismaClient.product.count({
        where: {
            merchantId: userId,
            id: product.id,
        },
    });
    if (existProduct !== 1) {
        throw new ResponseError(404, "Product is not found");
    }
    return prismaClient.product.update({
        where: {
            id: product.id,
        },
        data: {
            categoryId: product.categoryId,
        },
    });
};

const remove = async (userId, productId) => {
    productId = validate(getProductValidation, productId);
    const existProduct = await prismaClient.product.count({
        where: {
            merchantId: userId,
            id: productId,
        },
    });
    if (existProduct !== 1) {
        throw new ResponseError(404, "Product is not found");
    }
    return prismaClient.product.delete({
        where: {
            id: productId,
        },
    });
};

const searchProduct = async (userId, request) => {
    request = validate(searchProductValidation, request);
    const skip = (request.page - 1) * request.size;
    const filter = [];
    filter.push({
        merchantId: userId,
    });
    if (request.name) {
        filter.push({
            product_name: {
                contains: request.name,
            },
        });
    }
    if (request.price) {
        filter.push({
            price: {
                contains: request.price,
            },
        });
    }
    if (request.categoryId) {
        filter.push({
            categoryId: {
                contains: request.categoryId,
            },
        });
    }
    const products = await prismaClient.product.findMany({
        where: {
            AND: filter,
        },
        take: request.size,
        skip: skip,
    });
    const countItems = await prismaClient.product.count({
        where: {
            AND: filter,
        },
    });
    return {
        data: products,
        paging: {
            page: request.page,
            total_item: countItems,
            total_page: Math.ceil(countItems / request.size),
        },
    };
};

export default { create, update, updateCategory, remove, searchProduct };
