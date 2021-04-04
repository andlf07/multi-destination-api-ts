const { response } = require("express");
const bcrytp = require('bcrypt');

class LoginService {
   constructor() {
      this.model = require("../lib/models/userModel");
   }

   async login(req, res = response) {

      const { email, password } = req.body;

      try {
         //User exist?
         const user = await this.model.findOne({ email });

         if( user == null) {
            return res.status(400).json({
               msg: 'User y/o password incorrect'
            })
         }
         //Validate password
         const validPassword = await bcrytp.compare( password, user.password ).then(result => result)

         if( user && validPassword ) {

            //Generar JSONWEBTOKEN

            return res.status(200).json({
               msg: 'User y validPassword las dos true'
            })
         } else {
            return res.status(400).json({
               msg: 'User y/o password incorrect'
            });

         }

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            msg: 'Internal Error'
         })
      }

   }
}


module.exports = LoginService;