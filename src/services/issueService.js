const _ = require("lodash");
const { models, sequelize } = require("../database");
const { issueStatus } = require("../constants/issueStatus");

module.exports.createIssue = async (issue) => {
  const { Issue, Agent } = models;

  const availableAgent = await Agent.findOne({
    where: {
      available: true,
    },
  });

  const t = await sequelize.transaction();

  try {
    const newIssue = await Issue.create(issue, { transaction: t });

    if (!_.isNull(availableAgent)) {
      await newIssue.setAgent(availableAgent, { transaction: t });
      newIssue.set({
        status: issueStatus.ASSIGNED,
      });

      await newIssue.save({ transaction: t });

      availableAgent.set({
        available: false,
      });

      await availableAgent.save({ transaction: t });
    }

    await t.commit();

    return newIssue;
  } catch (error) {
    await t.rollback();
    throw error;
  }
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
  if (!agentId) {
    return;
  }

  const { Agent, Issue } = models;

  const agent = await Agent.findByPk(agentId);

  if (!agent) {
    return;
  }

  const issue = await Issue.findOne({
    where: {
      status: issueStatus.OPEN,
    },
  });

  if (!_.isNull(issue)) {
    await issue.setAgent(agent);

    issue.set({
      status: issueStatus.ASSIGNED,
    });

    await issue.save();

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

module.exports.getAllIssues = async () => {
  const { Agent, Issue } = models;

  const issues = await Issue.findAll({
    include: [
      {
        model: Agent,
      },
    ],
  });

  return issues;
};
