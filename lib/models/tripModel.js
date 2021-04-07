const { Schema, model } = require('mongoose');

const TripSchema = Schema({

   clientName: {
      type: String,
      require: [true, 'Need a Client name']
   },
   phoneNumber: {
      type: Number,
      require: [true, 'Need client phone number']
   },
   orderNumber: {
      type: Number,
      require: [true, 'Need order Number']
   },
   address: {
      street: {
         type: String,
         require: [true, 'Need street name']
      },
      number: {
         type: String,
         require: [true, 'Need number of the street']
      },
      comuna: {
         type: String,
         require: [true, 'Need the comuna']
      },
      city: {
         type: String,
         require: [true, 'Need the city']
      },
      region: {
         type: String,
         require: [true, 'Need the region']
      },
      zipCode: {
         type: Number,
         require: [true, 'Need the zip code']
      }
   },
   deliveryStatus: {
      type: Boolean
   }


})

TripSchema.methods.toJSON = function() {
   const { __v, _id, ...tripSchema } = this.toObject();

   tripSchema.id = _id;

   return tripSchema;
}


module.exports = model( 'Trip', TripSchema );
module.exports = TripSchema;