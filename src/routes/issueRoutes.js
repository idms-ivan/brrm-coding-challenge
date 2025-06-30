const router = require("express").Router();
const IssueController = require("../controllers/issueController");

router.post("/", IssueController.CreateIssue);
router.patch("/resolve/:id", IssueController.resolveIssue);

module.exports = router;
