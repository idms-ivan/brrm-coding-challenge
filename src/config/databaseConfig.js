const dotenv = require("dotenv");
const joi = require("joi");

dotenv.config();

const envSchema = joi
  .object()
  .keys({
    DATABASE_NAME: joi.string().required(),
    DATABASE_USERNAME: joi.string().required(),
    DATABASE_PASSWORD: joi.string().required(),
    DATABASE_HOST: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  databaseName: envVars.DATABASE_NAME,
  databaseUserName: envVars.DATABASE_USERNAME,
  databasePassword: envVars.DATABASE_PASSWORD,
  databaseHost: envVars.DATABASE_HOST,
};
