import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
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
   const { __v, _id, ...user } = this.toObject();

   user.id = _id;

   return user;
}




export const userModel = model( 'User', UserSchema );