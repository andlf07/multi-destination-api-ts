const joi = require("joi");

const validate = (data, schema) => {
  const { error } = joi.object(schema).validate(data);
  return error;
};

const validationHandler = (schema, check = "body") => {
  return (req, res, next) => {
    const error = validate(req[check], schema);

    error ? next(res.status(400).json(error.details)) : next();
  };
};

module.exports = validationHandler;
