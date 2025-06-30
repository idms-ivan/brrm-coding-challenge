const express = require("express");
const bodyParser = require("body-parser");
const { establishDatabaseConnection } = require("./database");
const { attachRoutes } = require("./routes/attachRoutes");

const initializeExpress = () => {
  const app = express();

  app.use(bodyParser.json({ limit: "10mb" }));

  const port = 3000;

  attachRoutes(app);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

const initializeApp = async () => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
