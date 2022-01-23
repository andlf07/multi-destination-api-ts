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
const MongoDB = require("../lib/db");
const bcrypt = require("bcrypt");
class UserService {
    constructor() {
        this.db = new MongoDB();
        this.userModel = require("../lib/models/userModel");
        this.tripModel = require('../lib/models/tripModel');
    }
    //Get all collection from DB
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const getCollection = yield this.userModel.find().populate('trips');
            this.db.closeDB();
            return getCollection;
        });
    }
    //get singleDcoument from collection = this.collection
    singleUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const singleDocument = yield this.userModel.findById(userId);
            this.db.closeDB();
            return singleDocument;
        });
    }
    //Creating a user
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            //Encrypt password with bcrypt
            const saltRounds = 6;
            const hashPassword = yield bcrypt
                .hash(data.password, saltRounds)
                .then((hash) => hash);
            data.password = hashPassword;
            const user = yield new this.userModel(data);
            yield user.save();
            this.db.closeDB();
            return user;
        });
    }
    //Updating document
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const updateDocument = yield this.userModel.findByIdAndUpdate(userId, data, { new: true });
            this.db.closeDB();
            return updateDocument;
        });
    }
    //Deleting one document
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const deleteDocument = yield this.userModel.findByIdAndDelete(userId);
            //deleting trips of user already delete
            const deleteTrips = yield this.tripModel.deleteMany({ user: userId });
            this.db.closeDB();
            return deleteDocument;
        });
    }
}
module.exports = UserService;
//# sourceMappingURL=userService.js.map