const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.homeRoute = '/';
    this.apiRoute = '/api/trip';


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

   this.app.use( this.homeRoute, require('../controllers/routes/homeRoute.routes') );
   this.app.use( this.apiRoute, require('../controllers/routes/apiTrip.routes') );

  }

  listenPort() {
    this.app.listen(this.port, () => {
      console.log("Server runing in port:", this.port);
    });
  }
}

module.exports = Server;
