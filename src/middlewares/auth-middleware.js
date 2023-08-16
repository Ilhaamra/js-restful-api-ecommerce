import jwt from "jsonwebtoken";
import config from "../app/environtment.js";

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, config.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).json({
                message: "Token invalid",
            });
        }
        req.userId = payload.sub;
        req.role = payload.role;
        next();
    });
};
