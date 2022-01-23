import express from "express";
import { validationHandler } from "../helpers/validation/validationHandler";
import {
  checkTripSchema,
  tripIdSchema,
  checkPatchTripSchema,
} from "../helpers/validation/checkTripSchema";
import { validateJWT } from "../middlewares/validateJWT";
import {
  getTrips,
  getTripsById,
  postTrips,
  patchTrips,
  deleteTrips,
} from "../controllers/trips/trips.controller";

export const trips = express.Router();

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

