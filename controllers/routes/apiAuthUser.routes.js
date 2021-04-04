const { Router } = require("express");
const LoginService = require("../../services/loginService");
const validationHandler = require("../../helpers/validation/validationHandler");
const {
  checkLoginUserSchema,
} = require("../../helpers/validation/checkUserSchema");

const loginService = new LoginService();

const router = Router();

router.post(
  "/login", validationHandler(checkLoginUserSchema),
  async (req, res, next) => {
    loginService.login(req, res);
  }
);

module.exports = router;
