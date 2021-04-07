const { response } = require("express");
const bcrytp = require('bcrypt');
const MongoDB = require("../lib/db");

class LoginService {
   constructor() {
      this.db = new MongoDB();
      this.model = require("../lib/models/userModel");
   }

   async login( email, password ) {

      // try {
         //User exist?
         const user = await this.db.connect().then(() => this.model.findOne( { email } ))

         if( user == null) {
            return null
         }
         //Validate password
         const validPassword = await bcrytp.compare( password, user.password ).then(result => result);

         if ( !validPassword) {
            return null
         }

         this.db.closeDB();
         return user;


         // if( user && validPassword ) {

         //    //Generar JSONWEBTOKEN

         //    return res.status(200).json({
         //       msg: 'User y validPassword las dos true'
         //    })
         // } else {
         //    return res.status(400).json({
         //       msg: 'User y/o password incorrect'
         //    });

         // }

      // } catch (error) {
      //    console.log(error);
      //    return res.status(500).json({
      //       msg: 'Internal Error'
      //    })
      // }

   }
}


module.exports = LoginService;