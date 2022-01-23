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
exports.RoutesService = void 0;
const routeModel_1 = require("../../lib/models/routeModel");
const tripModel_1 = require("../../lib/models/tripModel");
const userModel_1 = require("../../lib/models/userModel");
const db_1 = require("../../lib/db");
class RoutesService {
    constructor() {
        this.db = new db_1.MongoDB();
        this.userModel = userModel_1.userModel;
        this.tripModel = tripModel_1.tripModel;
        this.routeModel = routeModel_1.routeModel;
    }
    makeRoute(sql, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const findTrips = yield this.tripModel
                .find(sql)
                .skip(Number(0))
                .limit(Number(limit));
            const countTrips = yield this.tripModel.countDocuments(sql);
            this.db.closeDB();
            return { findTrips, countTrips };
        });
    }
    createRoute(userId, route) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const getUser = yield this.userModel.findById(userId);
            const newRoute = new this.routeModel(route);
            yield newRoute.save();
            getUser.routes = getUser.routes.concat(newRoute.id);
            yield getUser.save();
            this.db.closeDB();
            return newRoute;
        });
    }
    getRouteData(routeId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.connect();
            const getRoute = yield this.routeModel.findById(routeId).populate("routes");
            this.db.closeDB();
            const { routes } = getRoute;
            return routes;
        });
    }
}
exports.RoutesService = RoutesService;
// sebastian@academiamotoschile.cl
// +56954037897
// @sebajoke3
//# sourceMappingURL=routesServices.js.map