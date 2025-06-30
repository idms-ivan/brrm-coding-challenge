const router = require("express").Router();
const AgenController = require("../controllers/agentController");

router.post("/", AgenController.CreateAgent);
router.get("/", AgenController.GetAllAgents);
router.get("/:id", AgenController.GetOneAgentById);

module.exports = router;
