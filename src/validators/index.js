const joi = require("joi");

const createAgentSchema = joi.object({
  name: joi.string().required(),
  available: joi.boolean().optional(),
});

const createIssueSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
});

module.exports = {
  createAgentSchema,
  createIssueSchema,
};
