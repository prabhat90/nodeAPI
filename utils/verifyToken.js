import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => { 
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "Unauthenticated."));
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is invalid."));
        req.user = user;
        next();
    });
}

export const verifyUser = (req, res, next) => { 
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            next(new createError(403, "Not authorized."));
        }
    });
}

export const verifyAdmin = (req, res, next) => { 
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            next(new createError(403, "Not admin role."));
        }
    });
}