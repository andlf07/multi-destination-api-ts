const { Router } = require("express");
const validationHandler = require('../../helpers/validation/validationHandler');
const { checkTripSchema, tripIdSchema } = require("../../helpers/validation/checkTripSchema");
const TripService = require("../../services/TripService");

const tripService = new TripService();

const router = Router();


router.get('/', async ( req, res, next ) => {
    try {
        const getTrips = await tripService.getAllTrip();

        res.status(200).json({
            data: getTrips,
            msg: 'All trips, sucessfully get'
        })

    } catch ( err ) {
        next( err )
    }
})

router.post("/", validationHandler(checkTripSchema), async ( req, res, next ) => {{
    // Get data
    const { body: data } = req;
    try {
       const createTrip = await tripService.createTrip({ data });

       res.status(201).json({
         data: createTrip,
         msg: 'Order Trip, sucessfully create'
       });
    } catch( err ) {
       next( err );
    }

}});

router.put('/:tripId', validationHandler({ tripId: tripIdSchema }, 'params'), async ( req, res, next ) => {
    const { tripId } = req.params;
    const { body: trip } = req;
    try {
        const tripUpdate = await tripService.updateTrip({ tripId, trip });
        res.status(200).json({
            data: tripUpdate,
            msg: 'Order Trip, sucessfully update'
        })
    } catch (err) {
        next( err )
    }
})

router.delete('/:tripId', validationHandler({ tripId: tripIdSchema }, 'params'), async ( req, res, next) => {
    const { tripId } = req.params;
    try {
        const deleteTripId = await tripService.deleteTrip({ tripId });

        res.status(200).json({
            data: deleteTripId,
            msg: 'Order trip, sucessfully delete'
        })
    } catch ( err ) {
        next( err );
    }

})

module.exports = router;

