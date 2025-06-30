const agentRoutes = require("./agentRoutes");
const issueRoutes = require("./issueRoutes");

const attachRoutes = (app) => {
  app.use("/api/agent", agentRoutes);
  app.use("/api/issue", issueRoutes);
};

module.exports = {
  attachRoutes,
};
