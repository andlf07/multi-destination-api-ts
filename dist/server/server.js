"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("../routes/user.routes");
const trips_routes_1 = require("../routes/trips.routes");
const makeRoutes_routes_1 = require("../routes/makeRoutes.routes");
const auth_routes_1 = require("../routes/auth.routes");
const homeRoute_routes_1 = require("../routes/homeRoute.routes");
class Server {
    constructor() {
        this.apiPath = {
            homeRoute: '/',
            apiTrip: '/api/trip',
            apiUser: '/api/user',
            apiAuthUser: '/api/auth',
            apiMakeRoutes: '/api/routes'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8080';
        //Middlewares
        this.middlewares();
        //rutas de mi app
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //read and bodyparser
        this.app.use(express_1.default.json());
        //public directorio
        // this.app.use(express.static("public"));
    }
    routes() {
        this.app.use(this.apiPath.apiAuthUser, auth_routes_1.authUser);
        this.app.use(this.apiPath.apiUser, user_routes_1.user);
        this.app.use(this.apiPath.homeRoute, homeRoute_routes_1.home);
        this.app.use(this.apiPath.apiMakeRoutes, makeRoutes_routes_1.routeMaker);
        this.app.use(this.apiPath.apiTrip, trips_routes_1.trips);
    }
    listenPort() {
        this.app.listen(this.port, () => {
            console.log("Server runing in port:", this.port);
        });
    }
}
exports.Server = Server;
module.exports = Server;
//# sourceMappingURL=server.js.map