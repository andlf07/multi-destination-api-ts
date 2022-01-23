import { NextFunction, Request, RequestHandler, Response } from 'express'
import { verify } from 'jsonwebtoken'


export const validateJWT = ( req: any, res: Response, next: NextFunction ) => {

   const token = req.get('authorization');

   //If token is wrong
   if ( !token ) {
      return res.status(401).json({
         error: 'Unauthorized please login'
      })
   }
   try {

      //get id in JWT
      const { id, userType }: any = verify( token, String( process.env.JSONTOKEN_KEY ) );


      //send id and userType in request object
      req.id = id;
      req.userType = userType;
      next();

   } catch (error) {
      return res.status(401).json({
         error: 'Invalid token'
      })
   }

}
