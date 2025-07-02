const router = require("express").Router();
const AgenController = require("../controllers/agentController");
const validateRequest = require("../middleware/validateRequest");
const { createAgentSchema } = require("../validators");

router.post(
  "/",
  validateRequest(createAgentSchema),
  AgenController.createAgent
);
router.get("/", AgenController.getAllAgents);
router.get("/:id", AgenController.getOneAgentById);

module.exports = router;
