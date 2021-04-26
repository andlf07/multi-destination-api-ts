const express = require("express");
const validationHandler = require("../helpers/validation/validationHandler");
const {
  checkTripSchema,
  tripIdSchema,
  checkPatchTripSchema,
} = require("../helpers/validation/checkTripSchema");
const validateJWT = require("../middlewares/validateJWT");
const {
  getTrips,
  getTripsById,
  postTrips,
  patchTrips,
  deleteTrips,
} = require("../controllers/trips/trips.controller");

const trips = express.Router();

//Get All Trips of User
trips.get("/", validateJWT, getTrips);

//Get a Trip by id
trips.get(
  "/:tripId",
  [validateJWT, validationHandler({ tripId: tripIdSchema })],
  getTripsById
);

//Post a Trip
trips.post("/", [validateJWT, validationHandler(checkTripSchema)], postTrips);

//Modify a Trip by id
trips.patch(
  "/:tripId",
  [
    validateJWT,
    validationHandler({ tripId: tripIdSchema }, "params"),
    validationHandler(checkPatchTripSchema),
  ],
  patchTrips
);

//Delete a Trip by id
trips.delete(
  "/:tripId",
  [validateJWT, validationHandler({ tripId: tripIdSchema }, "params")],
  deleteTrips
);

module.exports = trips;
