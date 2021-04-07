const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = ( req = request, res = response, next ) => {

   const token = req.get('authorization');
   // const token = 242424

   if ( !token ) {
      return res.status(401).json({
         msg: 'Unauthorized please login'
      })
   }

   try {
      const { id } = jwt.verify( token, process.env.JSONTOKEN_KEY );

      req.id = id;
      next();

   } catch (error) {
      return res.status(401).json({
         msg: 'Invalid token'
      })
   }

}

module.exports = validateJWT;