const axios = require("axios");
const MongoDB = require("../lib/db");

class RoutesService {
  constructor() {
    this.db = new MongoDB();
    this.userModel = require("../lib/models/userModel");
    this.tripModel = require("../lib/models/tripModel");
    this.routeModel = require("../lib/models/routeModel");
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
      const data = await instance
        .get()
        .then((result) => result)
        .then((result) => result.data)
        .then((result) => result.features);
      return `${data[0].center[0]},${data[0].center[1]}`;
    } catch (error) {
      return [];
    }
  }
  async getRoute(coord = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coord}?`,
        params: {
          // country: "cl",
          access_token: process.env.MAPBOX_KEY,
          // //where start?
          sources: "0",
          //get only distance
          annotations: "distance",
          //destination
          // destinations: "",
        },
      });
      const data = await instance.get();
      return data;
    } catch (error) {
      return [];
    }
  }

  async makeRoute(sql, limit) {
    this.db.connect();
    const findTrips = await this.tripModel
      .find(sql)
      .skip(Number(0))
      .limit(Number(limit))
      .then((result) => result);
    const countTrips = await this.tripModel.countDocuments(sql);
    this.db.closeDB();

    return { findTrips, countTrips };
  }

  async createRoute(userId, route) {
    this.db.connect();
    const getUser = await this.userModel.findById(userId);
    const newRoute = new this.routeModel(route);
    await newRoute.save();
    getUser.routes = getUser.routes.concat(newRoute.id);
    await getUser.save();
    this.db.closeDB();

    return newRoute;
  }

  async getRouteData(routeId) {
    this.db.connect();
    const getRoute = await this.routeModel.findById(routeId).populate("routes");
    this.db.closeDB();

    const { routes } = getRoute;

    return routes;
  }
}

module.exports = RoutesService;

// sebastian@academiamotoschile.cl
// +56954037897
// @sebajoke3
