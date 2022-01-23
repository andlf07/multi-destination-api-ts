"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (data, schema) => {
    const { error } = joi_1.default.object(schema).validate(data);
    return error;
};
exports.validate = validate;
const validationHandler = (schema, check = "body") => {
    return (req, res, next) => {
        const error = exports.validate(req.body || req.params, schema);
        error ? next(res.status(400).json(error.details)) : next();
    };
};
exports.validationHandler = validationHandler;
//# sourceMappingURL=validationHandler.js.map