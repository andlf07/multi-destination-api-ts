const axios = require("axios");
const MongoDB = require("../lib/db");

class RoutesService {
  constructor() {
    this.db = new MongoDB();
    this.userModel = require("../lib/models/userModel");
    this.tripModel = require("../lib/models/tripModel");
  }
  async getCoord(address = "") {
    try {
      //http to MAPBOX API
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?`,
        params: {
          country: "cl",
          access_token: process.env.MAPBOX_KEY,
          limit: 1,
          language: "es",
        },
      });
      const { data } = await instance.get();
      return data.features.map((city) => ({
        name: city.place_name,
        lng: city.center[0],
        lat: city.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async makeRoute( sql, limit) {
    this.db.connect();
    console.log(sql.comuna)
    const findTrips = await this.tripModel
      .find( sql )
      .skip(Number(0))
      .limit(Number(limit))
      .then(result => result);
    const countTrips = await this.tripModel.countDocuments( sql )
    this.db.closeDB();

    return {
      data: findTrips,
      count: countTrips,
      msg: 'All its Ok'
    }
  }

  async createRoute() {
    this.db.connect();




    this.db.closeDB();
  }
}

module.exports = RoutesService;
