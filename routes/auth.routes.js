const express = require("express");
const validationHandler = require("../helpers/validation/validationHandler");
const {
  checkLoginUserSchema,
} = require("../helpers/validation/checkUserSchema");
const { signUser } = require("../controllers/auth/auth.controller");

const authUser = express.Router();

authUser.post("/login", validationHandler(checkLoginUserSchema), signUser);

module.exports = authUser;
