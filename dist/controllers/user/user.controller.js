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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getSingleUser = exports.getUsers = void 0;
const userService_1 = require("../../services/userService/userService");
const userService = new userService_1.UserService();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUsers = yield userService.getAllUsers();
        res.status(200).json({
            data: getAllUsers,
            msg: "All users collection",
        });
    }
    catch (err) {
        return err;
    }
});
exports.getUsers = getUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get userId in JWT
    const { userId } = req.params;
    try {
        const userById = yield userService.singleUser(userId);
        if (!userById) {
            return res.status(400).json({
                error: "user not exist"
            });
        }
        res.status(200).json({
            data: userById,
            msg: `User id: ${userId}`,
        });
    }
    catch (err) {
        return err;
    }
});
exports.getSingleUser = getSingleUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get user data
    const { body: data } = req;
    try {
        const createUser = yield userService.createUser(data);
        res.status(201).json({
            data: createUser,
            msg: `User: ${data.name} create`,
        });
    }
    catch (err) {
        return err;
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get userId and Data
    const { userId } = req.params;
    const { body: userData } = req;
    try {
        const updateUser = yield userService.updateUser(userId, userData);
        if (!updateUser) {
            return res.status(400).json({
                error: "user not exist"
            });
        }
        ;
        res.status(200).json({
            data: updateUser,
            msg: "User update",
        });
    }
    catch (err) {
        return err;
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const deleteUserById = yield userService.deleteUser(userId);
        if (!deleteUserById) {
            return res.status(400).json({
                error: "user not exist"
            });
        }
        res.status(200).json({
            data: deleteUserById,
            msg: 'User delete'
        });
    }
    catch (err) {
        return err;
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map