const _ = require("lodash");
const IssueService = require("../services/issueService");

module.exports.createIssue = async (req, res) => {
  const issue = await IssueService.createIssue(req.body);

  return res.status(200).json({
    success: true,
    message: "Created new issue",
    data: issue,
  });
};

module.exports.resolveIssue = async (req, res) => {
  const { id } = req.params;
  const resolvedIssue = await IssueService.resolveIssue(id);

  if (_.isNull(resolvedIssue)) {
    return res.status(404).json({
      success: false,
      message: `Cant find issue with ID: ${id}`,
    });
  }

  return res.status(200).json({
    success: true,
    message: `Resolved issue with ID: ${id}`,
    data: resolvedIssue,
  });
};

module.exports.getAllIssues = async (req, res) => {
  const issues = await IssueService.getAllIssues();

  return res.status(200).json({
    success: true,
    message: `All issues`,
    data: issues,
  });
};
