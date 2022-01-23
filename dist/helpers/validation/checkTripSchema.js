"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPatchTripSchema = exports.checkTripSchema = exports.tripIdSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.tripIdSchema = joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/);
const checkStringLowe = joi_1.default.string().lowercase();
exports.checkTripSchema = {
    clientName: joi_1.default.string().required().min(5).lowercase(),
    phoneNumber: joi_1.default.number().integer().min(3).required(),
    orderNumber: joi_1.default.number().integer().required(),
    street: checkStringLowe,
    number: joi_1.default.number().required(),
    comuna: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    region: joi_1.default.string().required(),
    zipCode: joi_1.default.number().required(),
    deliveryStatus: joi_1.default.boolean().required(),
};
exports.checkPatchTripSchema = {
    clientName: joi_1.default.string().min(5),
    phoneNumber: joi_1.default.number().integer().min(9).max(15),
    orderNumber: joi_1.default.number().integer(),
    street: checkStringLowe,
    number: joi_1.default.number(),
    comuna: joi_1.default.string(),
    city: joi_1.default.string(),
    region: joi_1.default.string(),
    zipCode: joi_1.default.number(),
    deliveryStatus: joi_1.default.boolean(),
};
//# sourceMappingURL=checkTripSchema.js.map