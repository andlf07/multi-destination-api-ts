import express, { Application } from "express";
import cors from "cors";
import { user } from "../routes/user.routes";
import { trips } from "../routes/trips.routes";
import { routeMaker } from "../routes/makeRoutes.routes";
import { authUser } from'../routes/auth.routes';
import { home } from "../routes/homeRoute.routes";

export class Server {

  private app: Application
  private port;
  private apiPath = {
    homeRoute: '/',
    apiTrip: '/api/trip',
    apiUser: '/api/user',
    apiAuthUser: '/api/auth',
    apiMakeRoutes: '/api/routes'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

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
    this.app.use(this.apiPath.apiAuthUser, authUser);
    this.app.use(this.apiPath.apiUser, user);
    this.app.use(this.apiPath.homeRoute, home);
    this.app.use(this.apiPath.apiMakeRoutes, routeMaker);
    this.app.use(this.apiPath.apiTrip, trips);
  }

  listenPort() {
    this.app.listen(this.port, () => {
      console.log("Server runing in port:", this.port);
    });
  }
}
