const express = require("express");
const validationHandler = require("../helpers/validation/validationHandler");
const {
  checkUserSchema,
  userIdSchema,
} = require("../helpers/validation/checkUserSchema");
const validateJWT = require("../middlewares/validateJWT");
const validateUserType = require("../middlewares/userType");
const {
  getUsers,
  getSingleUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/user/user.controller");

const user = express.Router();

//Get all Users? GET
user.get("/", [validateJWT, validateUserType], getUsers);

//Get one User by id? GET
user.get(
  "/:userId",
  [validateJWT, validateUserType, validationHandler({ userId: userIdSchema })],
  getSingleUser
);

//Create a User? POST
user.post("/", validationHandler(checkUserSchema), postUser);

//Update a User? PUT
user.put(
  "/:userId",
  [validateJWT, validationHandler({ userId: userIdSchema }, "params")],
  putUser
);
//Delete a User? DELETE
user.delete(
  "/:userId",
  [
    validateJWT,
    validateUserType,
    validationHandler({ userId: userIdSchema }, "params"),
  ],
  deleteUser
);

module.exports = user;
