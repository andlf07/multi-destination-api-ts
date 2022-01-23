import { Response, Request, NextFunction } from 'express';

export const validateUserType = (req: Request, res: Response, next: NextFunction  ) => {

  const { userType }: any = req;

  if (userType == "USER") {
    return res.status(401).json({
      error: "Unauthorized, dont have permission",
    });
  }

  if(userType == 'ADMIN') next();

};
