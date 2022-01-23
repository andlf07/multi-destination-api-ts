import Joi from "joi";

export const tripIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const checkStringLowe = Joi.string().lowercase();

export const checkTripSchema = {
  clientName: Joi.string().required().min(5).lowercase(),
  phoneNumber: Joi.number().integer().min(3).required(),
  orderNumber: Joi.number().integer().required(),
  street: checkStringLowe,
  number: Joi.number().required(),
  comuna: Joi.string().required(),
  city: Joi.string().required(),
  region: Joi.string().required(),
  zipCode: Joi.number().required(),
  deliveryStatus: Joi.boolean().required(),
};

export const checkPatchTripSchema = {
  clientName: Joi.string().min(5),
  phoneNumber: Joi.number().integer().min(9).max(15),
  orderNumber: Joi.number().integer(),
  street: checkStringLowe,
  number: Joi.number(),
  comuna: Joi.string(),
  city: Joi.string(),
  region: Joi.string(),
  zipCode: Joi.number(),
  deliveryStatus: Joi.boolean(),
};
