const { Router } = require("express");
const validationHandler = require('../../helpers/validation/validationHandler');
const { checkTripSchema, tripIdSchema } = require("../../helpers/validation/checkTripSchema");
const CrudService = require("../../services/crudService");
const TripService = require("../../services/tripService");
const tripModel = require('../../lib/models/tripModel');
const userModel = require("../../lib/models/userModel");
const validateJWT = require("../middlewares/validateJWT");

const crudService = new CrudService(userModel);
const tripService = new TripService();



const router = Router();

//Get All Trips of User
router.get('/', validateJWT, async ( req, res, next ) => {
    try {
        const { id } = req
        console.log(id)
        const getTrips = await crudService.singleDocument( id );

        if(!getTrips) {
            return res.status(400).json({
                error: 'no exist trips in your list'
            })
        }

        res.status(200).json({
            data: getTrips,
            msg: 'All trips, sucessfully get'
        })

    } catch ( err ) {
        next( err )
    }
})

//Get a Trip by id
router.get('/:tripId', [
    validateJWT,
    validationHandler({ tripId: tripIdSchema })
], async ( req, res, next ) => {
    //get id in params
    const { tripId } = req.params;
    //get id user in JWT
    const { id } = req;

    try {
        const tripById = await tripService.getSingleTrip( id, tripId )
        console.log(tripById)
        if(!tripById) {
            return res.status(400).json({
                error: 'trip do not exist'
            })
        }
        res.status(200).json({
            data: tripById,
            msg: `Trip ${tripId} sucessfully get`
        })
    } catch ( err ) {
        next( err )
    }
})

//Post a Trip
router.post("/", [
    validateJWT,
    validationHandler(checkTripSchema),
],async ( req, res, next ) => {{
    // Get in body data
    const { body: data } = req;
    const { id } = req
    console.log(id)
    try {
        //Create trip in user trips
        const createTrip = await tripService.createTrip( id, data )
        //send response in json
       res.status(201).json({
         data: createTrip,
         msg: 'Order Trip, sucessfully create'
       });
    } catch( err ) {
       next( err );
    }

}});

//Modify a Trip by id
router.put('/:tripId', [
    validateJWT,
    validationHandler({ tripId: tripIdSchema }, 'params')
], async ( req, res, next ) => {
    //Get tripId and trip to update
    const { tripId } = req.params;
    const { body: trip, id: userId } = req;
    try {
        //Using crudService findByIdAndUpdate
        const tripUpdate = await tripService.updateTrip(  userId, tripId, trip  );
        console.log(tripUpdate)

        if (!tripUpdate) {
            return res.status(400).json({
                error: 'trip do not exist'
            })
        }

        //send response
        res.status(200).json({
            data: tripUpdate,
            msg: 'Order Trip, sucessfully update'
        })
    } catch (err) {
        next( err )
    }
})

//Delete a Trip by id
router.delete('/:tripId', [
    validateJWT,
    validationHandler({ tripId: tripIdSchema }, 'params')
], async ( req, res, next) => {
    const { tripId } = req.params;
    const { id } = req;
    try {
        const deleteTripId = await tripService.deleteTrip( id, tripId )
        console.log(deleteTripId)

        if ( !deleteTripId ) {
            return res.status(400).json({
                error: 'trip do not exist'
            })
        }
        res.status(200).json({
            data: deleteTripId,
            msg: 'Order trip, sucessfully delete'
        })
    } catch ( err ) {
        next( err );
    }

})




module.exports = router;

