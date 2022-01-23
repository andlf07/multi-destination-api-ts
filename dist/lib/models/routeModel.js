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
exports.routeModel = void 0;
const mongoose_1 = require("mongoose");
const RoutesSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    routes: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Trip'
            }]
    },
    count: {
        type: Number
    }
});
RoutesSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, routes = __rest(_a, ["__v", "_id"]);
    routes.id = _id;
    return routes;
};
exports.routeModel = mongoose_1.model('Route', RoutesSchema);
//# sourceMappingURL=routeModel.js.map