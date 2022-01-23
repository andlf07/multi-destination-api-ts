import { LoginService } from '../../services/loginService/loginService'
import { signToken } from "../../middlewares/genJWT";
import bcrytp from 'bcrypt';
import { Request, Response } from 'express';

const loginService = new LoginService();

export const signUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await loginService.login(email);

    if (!user)
      return {
        error: "user y/o password incorrect",
      };

    //Validate password
    const validPassword = await bcrytp
      .compare(password, user.password)
      .then((result) => result);

    if (!validPassword)
      return {
        error: "user y/o password incorrect",
      };

    //Generar token
    const genToken = await signToken(user.id, user.userType);

    res.status(200).json({
      data: user,
      token: genToken,
    });
  } catch (err) {
    return err;
  }
};
