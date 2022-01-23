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
exports.tripModel = void 0;
const mongoose_1 = require("mongoose");
function toLower(v) {
    return v.toLowerCase();
}
const TripSchema = new mongoose_1.Schema({
    clientName: {
        type: String,
        set: toLower,
        require: [true, 'Need a Client name']
    },
    phoneNumber: {
        type: Number,
        require: [true, 'Need client phone number']
    },
    orderNumber: {
        type: Number,
        require: [true, 'Need order Number']
    },
    street: {
        type: String,
        set: toLower,
        require: [true, 'Need street name']
    },
    number: {
        type: String,
        require: [true, 'Need number of the street']
    },
    comuna: {
        type: String,
        set: toLower,
        require: [true, 'Need the comuna']
    },
    city: {
        type: String,
        set: toLower,
        require: [true, 'Need the city']
    },
    region: {
        type: String,
        set: toLower,
        require: [true, 'Need the region']
    },
    zipCode: {
        type: Number,
        require: [true, 'Need the zip code']
    },
    deliveryStatus: {
        type: Boolean
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
TripSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, tripSchema = __rest(_a, ["__v", "_id"]);
    tripSchema.id = _id;
    return tripSchema;
};
exports.tripModel = mongoose_1.model('Trip', TripSchema);
//# sourceMappingURL=tripModel.js.map