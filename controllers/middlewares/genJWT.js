const jwt = require('jsonwebtoken');

const signToken = ( id = '', userType = '' ) => {

   return new Promise( ( resolve, reject ) => {

      const payload = { id, userType };

      jwt.sign( payload, process.env.JSONTOKEN_KEY, {
         expiresIn: '5h'
      }, ( err, token ) => {
         if ( err ) {
            reject('JWT generate problem');
         } else {
            resolve( token );
         }
      });

   });

}

module.exports = signToken;