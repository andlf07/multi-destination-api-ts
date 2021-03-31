const MongoDB = require("../lib/db");
const TripSchema = require("../lib/models/tripModel");

class TripService {
  constructor() {
    this.db = new MongoDB();
    this.model = require("../lib/models/tripModel");
  }

  //Getting all trips from <trip> collection
  async getAllTrip() {
    // const allTrips = await this.db.getAll().then((result) => result);
    const allTrips = await this.db.connect().then(() => this.model.find())
    this.db.closeDB()
    return allTrips;
  }

  //Creating a <trip> and inseting in collection
  async createTrip(data) {
    const createTrip = await this.db.connect().then(() => new this.model(data).save());
    this.db.closeDB()
    return createTrip;
  }

  //Updating a <trip>
  async updateTrip({ tripId, trip }) {
    // const updateTripId = await this.db.update(this.collection, tripId, trip);
    const updateTripId = await this.db.connect().then(() => this.model.findByIdAndUpdate( tripId, trip ));
    this.db.closeDB();
    return updateTripId;
  }

  //get single trip by id

  async singleTrip({ tripId }) {
    const tripById = await this.db.connect().then(() => this.model.findById( tripId )).then( result  => result );
    this.db.closeDB();
    return tripById;
  }

  //Deleting one <trip>
  async deleteTrip({ tripId }) {
    const deleteTripId = await this.db.connect().then(() => this.model.findByIdAndDelete( tripId ).then(result => result.id));
    this.db.closeDB();
    return deleteTripId;
  }
}

module.exports = TripService;
