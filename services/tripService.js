const MongoDB = require("../lib/db");

class TripService {
  constructor() {
    this.db = new MongoDB();
    this.model = require("../lib/models/userModel");
  }

  //Create trip in User
  async createTrip(userId, tripData) {
    this.db.connect();
    const getDocument = await this.model.findById(userId).then((result) => {
      result.trips.push(tripData);
      result.save();
      return result;
    });
    this.db.closeDB;

    return getDocument;
  }

  //Get single trip
  async getSingleTrip(userId, tripId) {
    this.db.connect();
    const getSingleDoc = await this.model
      .findById(userId)
      .then((result) => result.trips.id(tripId));
    this.db.closeDB();
    return getSingleDoc;
  }

  async updateTrip(userId, tripId, data) {
     this.db.connect();
     const updateTrip = await this.model.findById(userId).then((result) => {
        const findTrip = result.trips.id(tripId)
        findTrip.set(data)
        return result.save();
     }).then(result => result)
     this.db.closeDB();
     return updateTrip
  }

  //delete trip by id
  async deleteTrip(userId, tripId) {
    this.db.connect();
    const deleteTrip = await this.model.findById(userId);
    deleteTrip.trips.id(tripId).remove();
    await deleteTrip.save();
    this.db.closeDB();

    return deleteTrip;
  }
}

module.exports = TripService;
