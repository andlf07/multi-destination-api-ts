const { Schema, model } = require('mongoose');
const TripSchema = require('./tripModel');



const RoutesSchema = Schema({

   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   routes: {
      type: [{
         type: Schema.Types.ObjectId,
         ref: 'Trip'
      }]
   },
   count: {
      type: Number
   }

})

RoutesSchema.methods.toJSON = function() {
   const { __v, _id, ...routes } = this.toObject();

   routes.id = _id;

   return routes;
}





module.exports = model( 'Route', RoutesSchema );