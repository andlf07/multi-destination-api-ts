"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const express_1 = __importDefault(require("express"));
exports.home = express_1.default.Router();
exports.home.get('/welcome', (req, res) => {
    res.json({
        hi: "Welcome to multi-destinaion-api"
    });
});
//# sourceMappingURL=homeRoute.routes.js.map