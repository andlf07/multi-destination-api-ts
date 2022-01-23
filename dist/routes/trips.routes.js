"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trips = void 0;
const express_1 = __importDefault(require("express"));
const validationHandler_1 = require("../helpers/validation/validationHandler");
const checkTripSchema_1 = require("../helpers/validation/checkTripSchema");
const validateJWT_1 = require("../middlewares/validateJWT");
const trips_controller_1 = require("../controllers/trips/trips.controller");
exports.trips = express_1.default.Router();
//Get All Trips of User
exports.trips.get("/", validateJWT_1.validateJWT, trips_controller_1.getTrips);
//Get a Trip by id
exports.trips.get("/:tripId", [validateJWT_1.validateJWT, validationHandler_1.validationHandler({ tripId: checkTripSchema_1.tripIdSchema })], trips_controller_1.getTripsById);
//Post a Trip
exports.trips.post("/", [validateJWT_1.validateJWT, validationHandler_1.validationHandler(checkTripSchema_1.checkTripSchema)], trips_controller_1.postTrips);
//Modify a Trip by id
exports.trips.patch("/:tripId", [
    validateJWT_1.validateJWT,
    validationHandler_1.validationHandler({ tripId: checkTripSchema_1.tripIdSchema }, "params"),
    validationHandler_1.validationHandler(checkTripSchema_1.checkPatchTripSchema),
], trips_controller_1.patchTrips);
//Delete a Trip by id
exports.trips.delete("/:tripId", [validateJWT_1.validateJWT, validationHandler_1.validationHandler({ tripId: checkTripSchema_1.tripIdSchema }, "params")], trips_controller_1.deleteTrips);
//# sourceMappingURL=trips.routes.js.map