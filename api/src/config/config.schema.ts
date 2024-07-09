import * as Joi from 'joi';

export const configSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('development', 'production'),
  DATABASE_URL: Joi.string().required(),
});
