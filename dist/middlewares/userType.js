"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserType = void 0;
const validateUserType = (req, res, next) => {
    const { userType } = req;
    if (userType == "USER") {
        return res.status(401).json({
            error: "Unauthorized, dont have permission",
        });
    }
    if (userType == 'ADMIN')
        next();
};
exports.validateUserType = validateUserType;
//# sourceMappingURL=userType.js.map