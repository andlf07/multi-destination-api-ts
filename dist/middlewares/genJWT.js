"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id = '', userType = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id, userType };
        jsonwebtoken_1.default.sign(payload, String(process.env.JSONTOKEN_KEY), {
            expiresIn: '5h'
        }, (err, token) => {
            if (err) {
                reject('JWT generate problem');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.signToken = signToken;
//# sourceMappingURL=genJWT.js.map