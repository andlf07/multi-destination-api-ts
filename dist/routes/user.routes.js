"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const validationHandler_1 = require("../helpers/validation/validationHandler");
const checkUserSchema_1 = require("../helpers/validation/checkUserSchema");
const validateJWT_1 = require("../middlewares/validateJWT");
const userType_1 = require("../middlewares/userType");
const user_controller_1 = require("../controllers/user/user.controller");
exports.user = express_1.default.Router();
//Get all Users? GET
exports.user.get("/", [validateJWT_1.validateJWT, userType_1.validateUserType], user_controller_1.getUsers);
//Get one User by id? GET
exports.user.get("/:userId", [validateJWT_1.validateJWT, userType_1.validateUserType, validationHandler_1.validationHandler({ userId: checkUserSchema_1.userIdSchema })], user_controller_1.getSingleUser);
//Create a User? POST
exports.user.post("/", validationHandler_1.validationHandler(checkUserSchema_1.checkUserSchema), user_controller_1.postUser);
//Update a User? PUT
exports.user.put("/:userId", [validateJWT_1.validateJWT, validationHandler_1.validationHandler({ userId: checkUserSchema_1.userIdSchema }, "params")], user_controller_1.putUser);
//Delete a User? DELETE
exports.user.delete("/:userId", [
    validateJWT_1.validateJWT,
    userType_1.validateUserType,
    validationHandler_1.validationHandler({ userId: checkUserSchema_1.userIdSchema }, "params"),
], user_controller_1.deleteUser);
//# sourceMappingURL=user.routes.js.map