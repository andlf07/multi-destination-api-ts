import express from 'express'
import {validationHandler} from "../helpers/validation/validationHandler";
import {
  checkLoginUserSchema,
} from "../helpers/validation/checkUserSchema";
import { signUser } from "../controllers/login/login";

export const authUser = express.Router();

authUser.post("/login", validationHandler(checkLoginUserSchema), signUser);

