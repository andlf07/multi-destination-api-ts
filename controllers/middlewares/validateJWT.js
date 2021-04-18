const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = ( req = request, res = response, next ) => {

   const token = req.get('authorization');

   //If token is wrong
   if ( !token ) {
      return res.status(401).json({
         msg: 'Unauthorized please login'
      })
   }

   try {

      //get id in JWT
      const { id, userType } = jwt.verify( token, process.env.JSONTOKEN_KEY );

      //send id and userType in request object
      req.id = id;
      req.userType = userType;
      next();

   } catch (error) {
      return res.status(401).json({
         msg: 'Invalid token'
      })
   }

}

module.exports = validateJWT;