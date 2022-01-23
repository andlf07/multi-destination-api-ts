"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUser = void 0;
const loginService_1 = require("../../services/loginService/loginService");
const genJWT_1 = require("../../middlewares/genJWT");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginService = new loginService_1.LoginService();
const signUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield loginService.login(email);
        if (!user)
            return {
                error: "user y/o password incorrect",
            };
        //Validate password
        const validPassword = yield bcrypt_1.default
            .compare(password, user.password)
            .then((result) => result);
        if (!validPassword)
            return {
                error: "user y/o password incorrect",
            };
        //Generar token
        const genToken = yield genJWT_1.signToken(user.id, user.userType);
        res.status(200).json({
            data: user,
            token: genToken,
        });
    }
    catch (err) {
        return err;
    }
});
exports.signUser = signUser;
//# sourceMappingURL=login.js.map