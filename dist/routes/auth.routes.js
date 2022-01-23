"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const express_1 = __importDefault(require("express"));
const validationHandler_1 = require("../helpers/validation/validationHandler");
const checkUserSchema_1 = require("../helpers/validation/checkUserSchema");
const login_1 = require("../controllers/login/login");
exports.authUser = express_1.default.Router();
exports.authUser.post("/login", validationHandler_1.validationHandler(checkUserSchema_1.checkLoginUserSchema), login_1.signUser);
//# sourceMappingURL=auth.routes.js.map