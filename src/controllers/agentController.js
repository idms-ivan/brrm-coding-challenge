const AgentService = require("../services/agentService");

module.exports.createAgent = async (req, res) => {
  const agent = await AgentService.createAgent(req.body);
  return res.status(200).json(agent);
};

module.exports.getAllAgents = async (req, res) => {
  const agents = await AgentService.getAllAgents();

  return res.status(200).json({
    success: true,
    message: "All agents",
    data: agents,
  });
};

module.exports.getOneAgentById = async (req, res) => {
  const { id } = req.params;
  const agent = await AgentService.getOneAgent(id);

  if (agent == null) {
    return res.status(404).json({
      success: false,
      message: `Cant find agent with ID: ${id}`,
    });
  }

  return res.status(200).json({
    success: true,
    message: `Agent with ID: ${id}`,
    data: agent,
  });
};
