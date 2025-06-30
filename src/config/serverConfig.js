const dotenv = require("dotenv");
const joi = require("joi");

dotenv.config();

const envSchema = joi
  .object()
  .keys({
    PORT: joi.number().positive().required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
};
