const Joi = require("joi");

const tripIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);


const checkTripSchema = {

   clientName: Joi.string().required().min(5),
   phoneNumber: Joi.number().integer().min(3).required(),
   orderNumber: Joi.number().integer().required(),
   address: Joi.object({
      street: Joi.string().required(),
      number: Joi.number().required(),
      comuna: Joi.string().required(),
      city: Joi.string().required(),
      region: Joi.string().required(),
      zipCode: Joi.number().required()
   }),
   deliveryStatus: Joi.boolean().required()
};


const checkPatchTripSchema = {

   clientName: Joi.string().min(5),
   phoneNumber: Joi.number().integer().min(9).max(15),
   orderNumber: Joi.number().integer(),
   address: Joi.object({
      street: Joi.string(),
      number: Joi.number(),
      comuna: Joi.string(),
      city: Joi.string(),
      region: Joi.string(),
      zipCode: Joi.number()
   }),
   deliveryStatus: Joi.boolean()
}


module.exports = {
   checkTripSchema,
   checkPatchTripSchema,
   tripIdSchema
};
