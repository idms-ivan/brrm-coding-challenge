const _ = require("lodash");
const { models } = require("../database");

module.exports.CreateAgent = async (agentDto) => {
  const { Agent } = models;

  const agent = await Agent.create(agentDto);

  return agent;
};

module.exports.GetAllAgents = async () => {
  const { Agent } = models;

  const agents = await Agent.findAll();

  return agents;
};

module.exports.GetOneAgent = async (id) => {
  const { Agent } = models;

  const agent = await Agent.findByPk(id);

  return agent;
};
