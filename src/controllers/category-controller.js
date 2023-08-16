import categoryService from "../services/category-service.js";

const create = async (req, res, next) => {
    try {
        const result = await categoryService.create(req.body);
        res.status(201).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await categoryService.update(req.params.id, req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const result = await categoryService.get();
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default { create, update, get };
