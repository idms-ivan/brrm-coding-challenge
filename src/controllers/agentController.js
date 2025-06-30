const AgentService = require("../services/agentService");

module.exports.CreateAgent = async (req, res) => {
  const agent = await AgentService.CreateAgent(req.body);
  return res.status(200).json(agent);
};

module.exports.GetAllAgents = async (req, res) => {
  const agents = await AgentService.GetAllAgents();

  return res.status(200).json({
    success: true,
    message: "All agents",
    data: agents,
  });
};

module.exports.GetOneAgentById = async (req, res) => {
  const { id } = req.params;
  const agent = await AgentService.GetOneAgent(id);

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
