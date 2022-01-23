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
exports.postRouteMaker = exports.getRouterMaker = exports.getMakeRoutes = void 0;
const mapBoxService_1 = require("../../services/mapBoxService/mapBoxService");
const routesServices_1 = require("../../services/routesServices/routesServices");
const routesServices = new routesServices_1.RoutesService();
const mapBoxService = new mapBoxService_1.MapBoxService();
const getMakeRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Id = User id from JWT
    const { id } = req;
    //Params status, comuna, limit in req.query
    const { status = false, comuna = "Santiago", limit = 2 } = req.query;
    const comunaToLower = comuna.toLowerCase();
    const sql = {
        user: id,
        deliveryStatus: status,
        comuna: comunaToLower,
    };
    try {
        const data = yield routesServices.makeRoute(sql, limit);
        const { findTrips, countTrips } = data;
        if (!findTrips)
            return res.status(400).json({
                error: "There no route in your list",
            });
        res.status(200).json({
            data: findTrips,
            count: countTrips,
            msg: `Route successfuly make`,
        });
    }
    catch (err) {
        return err;
    }
});
exports.getMakeRoutes = getMakeRoutes;
const getRouterMaker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get oruteID in params
    const { routeId } = req.params;
    try {
        const getRoute = yield routesServices.getRouteData(routeId);
        if (!getRoute)
            return res.status(400).json({
                error: "there no route in your list",
            });
        const getCoord = getRoute.map((trip) => __awaiter(void 0, void 0, void 0, function* () { return yield mapBoxService.getCoord(`${trip.street} ${trip.number}`); }));
        const promise = yield Promise.all(getCoord);
        const joinRoute = promise.join(";");
        const { data } = yield mapBoxService.getRoute(joinRoute);
        console.log(data);
        res.status(200).json({
            destination: data.destinations,
            distance: data.distances,
            msg: "Your details succesffuly ok",
        });
    }
    catch (error) {
        return (error);
    }
});
exports.getRouterMaker = getRouterMaker;
const postRouteMaker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req;
    const { body: data } = req;
    try {
        const makeRoute = yield routesServices.createRoute(id, data);
        res.status(201).json({
            data: makeRoute,
            msg: "Route succesffullly make",
        });
    }
    catch (err) {
        return err;
    }
});
exports.postRouteMaker = postRouteMaker;
//# sourceMappingURL=makeRoutes.controller.js.map