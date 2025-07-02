const router = require("express").Router();
const IssueController = require("../controllers/issueController");

router.post("/", IssueController.createIssue);
router.patch("/resolve/:id", IssueController.resolveIssue);
router.get("/", IssueController.getAllIssues);

module.exports = router;
