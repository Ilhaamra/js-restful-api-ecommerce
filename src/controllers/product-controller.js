import productService from "../services/product-service.js";

const create = async (req, res, next) => {
    try {
        const userId = req.userId;
        const request = req.body;
        const result = await productService.create(userId, request);
        res.status(201).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const userId = req.userId;
        const productId = req.params.productId;
        const request = req.body;
        request.id = productId;

        const result = await productService.update(userId, request);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const userId = req.userId;
        const productId = req.params.productId;
        const request = req.body;
        request.id = productId;
        console.log(productId);
        const result = await productService.updateCategory(userId, request);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const userId = req.userId;
        const productId = req.params.productId;
        await productService.remove(userId, productId);
        res.status(200).json({
            message: "OK",
        });
    } catch (error) {
        next(error);
    }
};

const searchProduct = async (req, res, next) => {
    try {
        const userId = req.userId;
        const request = {
            name: req.query.name,
            price: req.query.price,
            categoryId: req.query.categoryId,
            page: req.query.page,
            size: req.query.size,
        };

        const result = await productService.searchProduct(userId, request);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default { create, update, updateCategory, remove, searchProduct };
