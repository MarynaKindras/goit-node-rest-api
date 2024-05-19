import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("phone number must have 10 digits")
    .required(),
  favorite: Joi.bool(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("phone number must have 10 digits"),
  favorite: Joi.bool(),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.bool().required(),
});
