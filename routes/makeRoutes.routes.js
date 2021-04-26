const express = require("express");
const {
  getMakeRoutes,
  getRouterMaker,
  postRouteMaker,
} = require("../controllers/makeRoutes/makeRoutes.controller");
const validateJWT = require("../middlewares/validateJWT");

const routeMaker = express.Router();

//get trips and make route base to params status, comuna, limit = how much trips
routeMaker.get("/routemaker", validateJWT, getMakeRoutes);

routeMaker.get("/getmap/:routeId", validateJWT, getRouterMaker);

//create route and save in db
routeMaker.post("/createroute", validateJWT, postRouteMaker);
module.exports = routeMaker;
