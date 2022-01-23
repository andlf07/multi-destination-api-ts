"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password required']
    },
    trips: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Trip'
            }]
    },
    routes: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Route'
            }]
    },
    userType: {
        type: String,
        required: true,
        default: 'USER',
        emun: ['ADMIN', 'USER']
    }
});
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, user = __rest(_a, ["__v", "_id"]);
    user.id = _id;
    return user;
};
exports.userModel = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=userModel.js.map