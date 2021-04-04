const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.homeRoute = "/";
    this.apiTrip = "/api/trip";
    this.apiUser = "/api/user";
    this.apiAuthUser = '/api/auth'

    //Middlewares
    this.middlewares();

    //rutas de mi app
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Direcctorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiAuthUser, require("../controllers/routes/apiAuthUser.routes"));
    this.app.use(this.apiUser, require("../controllers/routes/apiUser.routes"));
    this.app.use(
      this.homeRoute,
      require("../controllers/routes/homeRoute.routes")
    );
    this.app.use(this.apiTrip, require("../controllers/routes/apiTrip.routes"));
  }

  listenPort() {
    this.app.listen(this.port, () => {
      console.log("Server runing in port:", this.port);
    });
  }
}

module.exports = Server;
