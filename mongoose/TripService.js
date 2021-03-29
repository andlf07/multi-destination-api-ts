const MongoDB = require('../mongoose/mongoose');
const TripSchema = require("../lib/models/tripModel");


class TripService {
  constructor() {
    this.collection = "Trips";
    this.db = new MongoDB();
  }

  //Getting all trips from <trip> collection
  async getAllTrip() {
    const allTrips = await TripSchema.find();
    return allTrips;
  }

  //Creating a <trip> and inseting in collection
  async createTrip({ data }) {
    const createTrip = await this.db.create(this.collection, data);
    return createTrip;
  }

  //Updating a <trip>
  async updateTrip({ tripId, trip }) {
    const updateTripId = await this.db.update(this.collection, tripId, trip);
    return updateTripId;
  }

  //Deleting one <trip>
  async deleteTrip({ tripId }) {
    const deleteTripId = await this.db.delete( this.collection, tripId );
    return deleteTripId;
  }
}

module.exports = TripService;
