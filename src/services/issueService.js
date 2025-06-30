const _ = require("lodash");
const { models } = require("../database");
const { issueStatus } = require("../constants/issueStatus");

module.exports.createIssue = async (issue) => {
  const { Issue, Agent } = models;

  const availableAgent = await Agent.findOne({
    where: {
      available: true,
    },
  });

  const newIssue = await Issue.create(issue);

  if (!_.isNull(availableAgent)) {
    await newIssue.setAgent(availableAgent);
    newIssue.set({
      status: issueStatus.ASSIGNED,
    });

    await newIssue.save();

    availableAgent.set({
      available: false,
    });

    await availableAgent.save();
  }

  return newIssue;
};

module.exports.resolveIssue = async (id) => {
  const { Issue } = models;

  const issue = await Issue.findByPk(id);

  if (_.isNull(issue)) {
    return null;
  }

  issue.set({
    status: issueStatus.RESOLVED,
  });

  await issue.save();

  await this.assignExistingIssue(issue.agentId);

  return issue;
};

module.exports.assignExistingIssue = async (agentId) => {
  const { Agent, Issue } = models;

  const agent = await Agent.findByPk(agentId);

  const issue = await Issue.findOne({
    where: {
      status: issueStatus.OPEN,
    },
  });

  if (!_.isNull(issue)) {
    await issue.setAgent(agent);
    agent.set({
      available: false,
    });
  } else {
    agent.set({
      available: true,
    });
  }

  await agent.save();
};
