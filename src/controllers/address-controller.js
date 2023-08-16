import addressService from "../services/address-service.js";

const create = async (req, res, next) => {
    try {
        const userId = req.userId;
        const request = req.body;
        const result = await addressService.create(userId, request);
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
        const addressId = req.params.addressId;
        const request = req.body;
        request.address_key = addressId;

        const result = await addressService.update(userId, request);
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
        const addressId = req.params.addressId;

        await addressService.remove(userId, addressId);
        res.status(200).json({
            message: "OK",
        });
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const userId = req.userId;
        const addressId = req.params.addressId;

        const result = await addressService.getOne(userId, addressId);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
export default { create, update, remove, getOne };
