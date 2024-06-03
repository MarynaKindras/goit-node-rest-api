import Joi from "joi";
import { emailRegexp } from "../utils/validationPatterns.js";
import { userSubscriptionValues } from "../utils/constants.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...userSubscriptionValues),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...userSubscriptionValues)
    .required(),
});

export const authEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
