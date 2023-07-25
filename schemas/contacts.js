const Joi = require("joi");

const contactBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .regex(
      /^[\\+(]?\d{1,4}?[)-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )
    .required(),
});

module.exports = {
  contactBodySchema,
};
