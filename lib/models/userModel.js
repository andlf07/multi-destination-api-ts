const { Schema, model } = require('mongoose');
const TripSchema = require('./tripModel');

const UserSchema = Schema({
   name: {
      type: String,
      required: [true, 'name is required']
   },
   email: {
      type: String,
      required: [true, 'email is required'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'password required']
   },
   trips: {
      type: [{
         type: Schema.Types.ObjectId,
         ref: 'Trip'
      }]
   },
   routes: {
      type: [{
         type: Schema.Types.ObjectId,
         ref: 'Route'
      }]
   },
   userType: {
      type: String,
      required: true,
      default: 'USER',
      emun: ['ADMIN', 'USER']
   }
});

UserSchema.methods.toJSON = function() {
   const { __v, _id, password, ...user } = this.toObject();

   user.id = _id;

   return user;
}




module.exports = model( 'User', UserSchema );