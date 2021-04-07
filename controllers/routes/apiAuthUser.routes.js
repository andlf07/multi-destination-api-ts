const { Router } = require("express");
const LoginService = require("../../services/loginService");
const validationHandler = require("../../helpers/validation/validationHandler");
const {
  checkLoginUserSchema,
} = require("../../helpers/validation/checkUserSchema");
const signToken = require("../middlewares/genJWT");

const loginService = new LoginService();

const router = Router();

router.post(
  "/login",
  validationHandler(checkLoginUserSchema),
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const login = await loginService.login(email, password);

      if (login == null) {
        return res.status(400).json({
          msg: "user y/o password are incorrect",
        });
      }

      //Generar token
      const genToken = await signToken(login.id);

      res.status(200).json({
        data: login,
        token: genToken,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
