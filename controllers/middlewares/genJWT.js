const jwt = require('jsonwebtoken');

const signToken = ( id = '' ) => {

   return new Promise( ( resolve, reject ) => {

      const payload = { id };

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