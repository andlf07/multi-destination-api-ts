const express = require("express");
const cors = require("cors");
const user = require("../routes/user.routes");
const trips = require("../routes/trips.routes");
const routeMaker = require("../routes/makeRoutes.routes");
const authUser = require('../routes/auth.routes')
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.homeRoute = "/";
    this.apiTrip = "/api/trip";
    this.apiUser = "/api/user";
    this.apiAuthUser = "/api/auth";
    this.apiMakeRoutes = "/api/routes";

    //Middlewares
    this.middlewares();

    //rutas de mi app
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //read and bodyparser
    this.app.use(express.json());

    //public directorio
    // this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiAuthUser, authUser);
    this.app.use(this.apiUser, user);
    this.app.use(this.homeRoute, require("../routes/homeRoute.routes"));
    this.app.use(this.apiMakeRoutes, routeMaker);
    this.app.use(this.apiTrip, trips);
  }

  listenPort() {
    this.app.listen(this.port, () => {
      console.log("Server runing in port:", this.port);
    });
  }
}

module.exports = Server;
