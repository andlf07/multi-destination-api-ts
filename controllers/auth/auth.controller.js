const LoginService = require('../../services/loginService');
const signToken = require("../../middlewares/genJWT");
const bcrytp = require("bcrypt");

const loginService = new LoginService();

const signUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService.login(email, password);

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

module.exports = {
  signUser,
};
