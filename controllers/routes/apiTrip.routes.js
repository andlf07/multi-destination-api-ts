const { Router } = require("express");
const validationHandler = require('../../helpers/validation/validationHandler');
const { checkTripSchema, tripIdSchema } = require("../../helpers/validation/checkTripSchema");
const CrudService = require("../../services/TripService");
const tripModel = require('../../lib/models/tripModel')

const crudService = new CrudService(tripModel);

const router = Router();

//Get All Trips
router.get('/', async ( req, res, next ) => {
    try {
        const getTrips = await crudService.getCollection();

        res.status(200).json({
            data: getTrips,
            msg: 'All trips, sucessfully get'
        })

    } catch ( err ) {
        next( err )
    }
})

//Get a Trip by id
router.get('/:tripId', validationHandler({ tripId: tripIdSchema }), async ( req, res, next ) => {
    //get id in params
    const { tripId } = req.params;

    try {
        const tripById = await crudService.singleDocument( {tripId} )
        res.status(200).json({
            data: tripById,
            msg: `Trip ${tripId} sucessfully get`
        })
    } catch ( err ) {
        console.log( err )
    }
})

//Post a Trip
router.post("/", validationHandler(checkTripSchema), async ( req, res, next ) => {{
    // Get in body data
    const { body: data } = req;
    try {
        //Create trip with tripService
       const createTrip = await crudService.createDocument(  data  );
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
router.put('/:tripId', validationHandler({ tripId: tripIdSchema }, 'params'), async ( req, res, next ) => {
    //Get tripId and trip to update
    const { tripId } = req.params;
    const { body: trip } = req;
    try {
        //Using tripService findByIdAndUpdate
        const tripUpdate = await crudService.updateDocument( { tripId, trip } );
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
router.delete('/:tripId', validationHandler({ tripId: tripIdSchema }, 'params'), async ( req, res, next) => {
    const { tripId } = req.params;
    try {
        const deleteTripId = await crudService.deleteDocument({ tripId });

        res.status(200).json({
            idDelete: deleteTripId,
            msg: 'Order trip, sucessfully delete'
        })
    } catch ( err ) {
        next( err );
    }

})




module.exports = router;

