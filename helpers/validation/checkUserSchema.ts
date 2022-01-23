import Joi from "joi";

export const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userEmailCheck = Joi.string().email();
const userPasswordCheck = Joi.string().alphanum;

export const checkUserSchema = {
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().required()
};

export const checkPatchUserSchema = {
   name: Joi.string().min(3).max(30),
   email: Joi.string(),
   password: Joi.string().alphanum()
};

export const checkLoginUserSchema = {
   email: Joi.string().email().required(),
   password: Joi.string().alphanum().required()

}
