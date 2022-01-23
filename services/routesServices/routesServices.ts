import { routeModel } from "../../lib/models/routeModel";
import { tripModel } from "../../lib/models/tripModel";
import { userModel } from "../../lib/models/userModel";
import { sqlRoute } from "./interface";

import { MongoDB } from "../../lib/db";
export class RoutesService {

  private db;
  private userModel;
  private tripModel;
  private routeModel;

  public constructor() {
    this.db = new MongoDB();
    this.userModel = userModel;
    this.tripModel = tripModel;
    this.routeModel = routeModel;
  }

  async makeRoute(sql: sqlRoute, limit: number): Promise<[] | any> {
    this.db.connect();
    const findTrips = await this.tripModel
      .find(sql)
      .skip(Number(0))
      .limit(Number(limit))
    const countTrips = await this.tripModel.countDocuments(sql);
    this.db.closeDB();

    return { findTrips, countTrips };
  }

  async createRoute(userId: string, route: string): Promise<[]> {
    this.db.connect();
    const getUser = await this.userModel.findById(userId);
    const newRoute = new this.routeModel(route);
    await newRoute.save();
    getUser.routes = getUser.routes.concat(newRoute.id);
    await getUser.save();
    this.db.closeDB();

    return newRoute;
  }

  async getRouteData(routeId: string): Promise<[]> {
    this.db.connect();
    const getRoute = await this.routeModel.findById(routeId).populate("routes");
    this.db.closeDB();

    const { routes } = getRoute;

    return routes;
  }
}

// sebastian@academiamotoschile.cl
// +56954037897
// @sebajoke3
