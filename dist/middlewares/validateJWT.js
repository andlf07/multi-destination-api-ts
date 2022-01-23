"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    const token = req.get('authorization');
    //If token is wrong
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized please login'
        });
    }
    try {
        //get id in JWT
        const { id, userType } = jsonwebtoken_1.verify(token, String(process.env.JSONTOKEN_KEY));
        //send id and userType in request object
        req.id = id;
        req.userType = userType;
        next();
    }
    catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map