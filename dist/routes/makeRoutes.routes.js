"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMaker = void 0;
const express_1 = __importDefault(require("express"));
const makeRoutes_controller_1 = require("../controllers/makeRoutes/makeRoutes.controller");
const validateJWT_1 = require("../middlewares/validateJWT");
exports.routeMaker = express_1.default.Router();
//get trips and make route base to params status, comuna, limit = how much trips
exports.routeMaker.get("/routemaker", validateJWT_1.validateJWT, makeRoutes_controller_1.getMakeRoutes);
exports.routeMaker.get("/getmap/:routeId", validateJWT_1.validateJWT, makeRoutes_controller_1.getRouterMaker);
//create route and save in db
exports.routeMaker.post("/createroute", validateJWT_1.validateJWT, makeRoutes_controller_1.postRouteMaker);
//# sourceMappingURL=makeRoutes.routes.js.map