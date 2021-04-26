const MongoDB = require("../lib/db");

class TripService {
  constructor() {
    this.db = new MongoDB();
    this.userModel = require("../lib/models/userModel");
    this.tripModel = require("../lib/models/tripModel");
  }

  //get all trips
  async getAllTrips(userId) {
    this.db.connect();
    const getTrips = await this.tripModel.find({ user: userId });
    this.db.closeDB();

    return getTrips;
  }

  //Get single trip
  async getSingleTrip(tripId) {
    this.db.connect();
    const getSingleDoc = await this.tripModel.findById(tripId);
    this.db.closeDB();

    return getSingleDoc;
  }

  //Create trip in User
  async createTrip(userId, tripData) {
    this.db.connect();
    const getDocument = await this.userModel.findById(userId);
    const newTrip = new this.tripModel(tripData);
    const saveTrip = await newTrip.save();
    getDocument.trips = getDocument.trips.concat(saveTrip.id);
    await getDocument.save();
    this.db.closeDB();

    return saveTrip;
  }

  //Update trip need userId = user, tripId = trip to modify, data = data to modify
  async updateTrip(tripId, data) {
    this.db.connect();
    const updateTrip = await this.tripModel.findOneAndUpdate({_id: tripId}, data, { new: true });
    this.db.closeDB();

    return updateTrip;
  }

  //delete trip by id
  async deleteTrip(userId, tripId) {
    this.db.connect();
    //delete in trips
    const deleteTrip = await this.tripModel.findByIdAndDelete(tripId);
    //delete in User trips
    const deleteInUser = await this.userModel.findById(userId);
    const indexOfTrip = deleteInUser.trips.indexOf(tripId);
    deleteInUser.trips.splice(indexOfTrip, 1);
    await deleteInUser.save();
    this.db.closeDB();



    return deleteTrip;
  }
}

module.exports = TripService;
