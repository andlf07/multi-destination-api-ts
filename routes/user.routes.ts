import express from "express";
import { validationHandler } from "../helpers/validation/validationHandler";
import {
  checkUserSchema,
  userIdSchema,
} from "../helpers/validation/checkUserSchema";
import { validateJWT } from "../middlewares/validateJWT";
import { validateUserType } from "../middlewares/userType";
import {
  getUsers,
  getSingleUser,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user/user.controller";

export const user = express.Router();

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
