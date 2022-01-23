"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginUserSchema = exports.checkPatchUserSchema = exports.checkUserSchema = exports.userIdSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userIdSchema = joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/);
const userEmailCheck = joi_1.default.string().email();
const userPasswordCheck = joi_1.default.string().alphanum;
exports.checkUserSchema = {
    name: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().alphanum().required()
};
exports.checkPatchUserSchema = {
    name: joi_1.default.string().min(3).max(30),
    email: joi_1.default.string(),
    password: joi_1.default.string().alphanum()
};
exports.checkLoginUserSchema = {
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().alphanum().required()
};
//# sourceMappingURL=checkUserSchema.js.map