import jwt from 'jsonwebtoken';

 export const signToken = ( id: string = '', userType: string = '' ) => {

   return new Promise( ( resolve, reject ) => {

      const payload = { id, userType };

      jwt.sign( payload, String(process.env.JSONTOKEN_KEY), {
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
