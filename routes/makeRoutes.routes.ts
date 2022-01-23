import express from "express";
import {
  getMakeRoutes,
  getRouterMaker,
  postRouteMaker,
} from "../controllers/makeRoutes/makeRoutes.controller";
import { validateJWT } from "../middlewares/validateJWT";

export const routeMaker = express.Router();

//get trips and make route base to params status, comuna, limit = how much trips
routeMaker.get("/routemaker", validateJWT, getMakeRoutes);

routeMaker.get("/getmap/:routeId", validateJWT, getRouterMaker);

//create route and save in db
routeMaker.post("/createroute", validateJWT, postRouteMaker);
