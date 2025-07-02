const _ = require("lodash");
const { models } = require("../database");

module.exports.createAgent = async (agentDto) => {
  const { Agent } = models;

  const agent = await Agent.create(agentDto);

  return agent;
};

module.exports.getAllAgents = async () => {
  const { Agent } = models;

  const agents = await Agent.findAll();

  return agents;
};

module.exports.getOneAgent = async (id) => {
  const { Agent } = models;

  const agent = await Agent.findByPk(id);

  return agent;
};
