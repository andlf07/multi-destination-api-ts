const Joi = require("joi");

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userEmailCheck = Joi.string().email();
const userPasswordCheck = Joi.string().alphanum;

const checkUserSchema = {
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().alphanum().required()
};

const checkPatchUserSchema = {
   name: Joi.string().min(3).max(30),
   email: Joi.string(),
   password: Joi.string().alphanum()
};

const checkLoginUserSchema = {
   email: Joi.string().email().required(),
   password: Joi.string().alphanum().required()

}


module.exports = {
   checkPatchUserSchema,
   checkUserSchema,
   userIdSchema,
   checkLoginUserSchema
}