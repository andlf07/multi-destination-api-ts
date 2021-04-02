const Joi = require("joi");

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

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


module.exports = {
   checkPatchUserSchema,
   checkUserSchema,
   userIdSchema
}