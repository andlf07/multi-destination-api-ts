const { Router } = require("express");
const validationHandler = require("../../helpers/validation/validationHandler");
const {
  checkTripSchema,
  tripIdSchema,
  checkPatchTripSchema,
} = require("../../helpers/validation/checkTripSchema");
const TripService = require("../../services/tripService");
const validateJWT = require("../middlewares/validateJWT");
const { object } = require("joi");

const tripService = new TripService();

const router = Router();

//Get All Trips of User
router.get("/", validateJWT, async (req, res, next) => {
  try {
    //get id from request in JWT
    const { id } = req;
    //get alltrips
    const getTrips = await tripService.getAllTrips(id);

    //response
    res.status(200).json(getTrips);
  } catch (err) {
    next(err);
  }
});

//Get a Trip by id
router.get(
  "/:tripId",
  [validateJWT, validationHandler({ tripId: tripIdSchema })],
  async (req, res, next) => {
    //get trip id in params
    const { tripId } = req.params;

    try {
      //get single trip(subDoc) from db
      const tripById = await tripService.getSingleTrip(tripId);
      console.log(tripById);

      //send response
      res.status(200).json(tripById);
    } catch (err) {
      next(err);
    }
  }
);

//Post a Trip
router.post(
  "/",
  [validateJWT, validationHandler(checkTripSchema)],
  async (req, res, next) => {
    {
      // Get data in body
      const { body: data } = req;
      //get id user in JWT
      const { id } = req;

      data.user = id;

      // const { street, comuna, region, city, ...rest } = data


      try {
        //Create trip in User trips
        const createTrip = await tripService.createTrip(id, data);
        //all is ok
        res.status(201).json(createTrip);
      } catch (err) {
        next(err);
      }
    }
  }
);

//Modify a Trip by id
router.patch(
  "/:tripId",
  [
    validateJWT,
    validationHandler({ tripId: tripIdSchema }, "params"),
    validationHandler(checkPatchTripSchema),
  ],
  async (req, res, next) => {
    //Get tripId and trip to update
    const { tripId } = req.params;
    // trip = data to update
    const { body: data } = req;
    try {
      //Send data to modify
      const tripUpdate = await tripService.updateTrip(tripId, data);

      //all is ok
      res.status(200).json(tripUpdate);
    } catch (err) {
      next(err);
    }
  }
);

//Delete a Trip by id
router.delete(
  "/:tripId",
  [validateJWT, validationHandler({ tripId: tripIdSchema }, "params")],
  async (req, res, next) => {
    //get trip id in request
    const { tripId } = req.params;
    //get id = UserId from request
    const { id } = req;
    try {
      //Delete from db
      const deleteTripId = await tripService.deleteTrip(id, tripId);

      //send response
      res.status(200).json(deleteTripId);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
