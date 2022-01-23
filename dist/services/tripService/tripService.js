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
exports.TripService = void 0;
const db_1 = require("../../lib/db");
const userModel_1 = require("../../lib/models/userModel");
const tripModel_1 = require("../../lib/models/tripModel");
class TripService {
    constructor() {
        this.db = new db_1.MongoDB();
        this.userModel = userModel_1.userModel;
        this.tripModel = tripModel_1.tripModel;
    }
    //get all trips
    getAllTrips(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const getTrips = yield this.tripModel.find({ user: userId });
            this.db.closeDB();
            return getTrips;
        });
    }
    //Get single trip
    getSingleTrip(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const getSingleDoc = yield this.tripModel.findById(tripId);
            this.db.closeDB();
            return getSingleDoc;
        });
    }
    //Create trip in User
    createTrip(userId, tripData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const getDocument = yield this.userModel.findById(userId);
            const newTrip = new this.tripModel(tripData);
            const saveTrip = yield newTrip.save();
            getDocument.trips = getDocument.trips.concat(saveTrip.id);
            yield getDocument.save();
            this.db.closeDB();
            return saveTrip;
        });
    }
    //Update trip need userId = user, tripId = trip to modify, data = data to modify
    updateTrip(tripId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const updateTrip = yield this.tripModel.findOneAndUpdate({ _id: tripId }, data, { new: true });
            this.db.closeDB();
            return updateTrip;
        });
    }
    //delete trip by id
    deleteTrip(userId, tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            //delete in trips
            const deleteTrip = yield this.tripModel.findByIdAndDelete(tripId);
            //delete in User trips
            const deleteInUser = yield this.userModel.findById(userId);
            const indexOfTrip = deleteInUser.trips.indexOf(tripId);
            deleteInUser.trips.splice(indexOfTrip, 1);
            yield deleteInUser.save();
            this.db.closeDB();
            return deleteTrip;
        });
    }
}
exports.TripService = TripService;
//# sourceMappingURL=tripService.js.map