import { Schema, model } from 'mongoose';



const RoutesSchema = new Schema({

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





export const routeModel = model( 'Route', RoutesSchema );