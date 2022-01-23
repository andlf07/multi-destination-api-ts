import { Schema, model } from 'mongoose';


function toLower(v: string): string {
   return v.toLowerCase();
 }


const TripSchema = new Schema({

   clientName: {
      type: String,
      set: toLower,
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
   street: {
      type: String,
      set: toLower,
      require: [true, 'Need street name']
   },
   number: {
      type: String,
      require: [true, 'Need number of the street']
   },
   comuna: {
      type: String,
      set: toLower,
      require: [true, 'Need the comuna']
   },
   city: {
      type: String,
      set: toLower,
      require: [true, 'Need the city']
   },
   region: {
      type: String,
      set: toLower,
      require: [true, 'Need the region']
   },
   zipCode: {
      type: Number,
      require: [true, 'Need the zip code']
   },
   deliveryStatus: {
      type: Boolean
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   }


})

TripSchema.methods.toJSON = function() {
   const { __v, _id, ...tripSchema } = this.toObject();

   tripSchema.id = _id;

   return tripSchema;
}

export const tripModel = model( 'Trip', TripSchema );
