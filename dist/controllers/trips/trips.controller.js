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
exports.deleteTrips = exports.patchTrips = exports.postTrips = exports.getTripsById = exports.getTrips = void 0;
const tripService_1 = require("../../services/tripService/tripService");
const tripService = new tripService_1.TripService();
const getTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get id from request in JWT
        const { id } = req;
        //get alltrips
        const getTrips = yield tripService.getAllTrips(id);
        if (!getTrips) {
            return res.status(400).json({
                error: "dont have trips",
            });
        }
        //response
        res.status(200).json({
            data: getTrips,
            msg: "All trips, sucessfully get",
        });
    }
    catch (err) {
        return err;
    }
});
exports.getTrips = getTrips;
const getTripsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get trip id in params
    const { tripId } = req.params;
    try {
        //get single trip(subDoc) from db
        const tripById = yield tripService.getSingleTrip(tripId);
        if (!tripById) {
            return res.status(400).json({
                error: `There no trip with id: ${tripId}`,
            });
        }
        //send response
        res.status(200).json({
            data: tripById,
            msg: `Trip ${tripId}, sucessfully get`,
        });
    }
    catch (err) {
        return err;
    }
});
exports.getTripsById = getTripsById;
const postTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data in body
    const { body: data } = req;
    //get id user in JWT
    const { id } = req;
    data.user = id;
    try {
        //Create trip in User trips
        const createTrip = yield tripService.createTrip(id, data);
        //all is ok
        res.status(201).json({
            data: createTrip,
            msg: "Order successfully create",
        });
    }
    catch (err) {
        return err;
    }
});
exports.postTrips = postTrips;
const patchTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get tripId and trip to update
    const { tripId } = req.params;
    // trip = data to update
    const { body: data } = req;
    try {
        //Send data to modify
        const tripUpdate = yield tripService.updateTrip(tripId, data);
        if (!tripUpdate) {
            return res.status(400).json({
                error: `There no trip with id: ${tripId}`,
            });
        }
        //all is ok
        res.status(200).json({
            data: tripUpdate,
            msg: "Trip sucessfully update",
        });
    }
    catch (err) {
        return err;
    }
});
exports.patchTrips = patchTrips;
const deleteTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get trip id in request
    const { tripId } = req.params;
    //get id = UserId from request
    const { id } = req;
    try {
        //Delete from db
        const deleteTripId = yield tripService.deleteTrip(id, tripId);
        //if doest not exist
        if (!deleteTripId) {
            return res.status(400).json({
                error: `There no trip with id: ${tripId}`,
            });
        }
        //send response
        res.status(200).json({
            data: deleteTripId,
            msg: "Order trip, sucessfully delete",
        });
    }
    catch (err) {
        return err;
    }
});
exports.deleteTrips = deleteTrips;
//# sourceMappingURL=trips.controller.js.map